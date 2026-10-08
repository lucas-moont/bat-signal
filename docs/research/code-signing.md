# Windows code signing for Bat-Signal v1.0

Research note, 2026-10-07. Scope: the first public NSIS installer (per-user, built by electron-builder on `windows-latest`, released from a `v*` tag). The maintainer is one person in Brazil with no company.

## TL;DR

**Ship v1.0 unsigned, with a short README section and SHA-256 checksums. Apply to SignPath Foundation as soon as v1.0 is public. Sign from the first release after approval.** SignPath Foundation is the only free option, and it requires that the project is "already released in the form that should be signed", so v1.0 has to go out first either way. Azure Artifact Signing is out: individual developers must live in the US or Canada. A paid certificate is possible (about US$129/yr plus US$180/yr for cloud signing at SSL.com). It still doesn't remove the SmartScreen prompt on day one, because Microsoft says no OV or EV certificate gives instant reputation any more. What changes for real users is this: signing lifts the hard block from **Smart App Control**, which stops unsigned, unknown apps with no "Run anyway" button.

## Comparison

| Option | Cost | Paperwork / timeline | Publisher shown | SmartScreen effect | electron-builder + Actions fit |
|---|---|---|---|---|---|
| Unsigned | US$0 | None | "Unknown publisher" | Prompt on every new version: reputation is per file hash and starts at zero each release. Smart App Control (enforcement) blocks with no override | Nothing to do (`signExecutable: false`, or no signer set) |
| SignPath Foundation | US$0 | Application plus a public "Code signing policy" page. Needs an existing release and "verifiable reputation". Timeline: unverified | **SignPath Foundation** (not the maintainer) | Prompt until reputation builds. Reputation then carries across releases (same certificate). Passes Smart App Control's trusted-CA check | Two-pass build: `--dir`, sign the exe, `--prepackaged` NSIS, sign the installer. Each signing request goes through `signpath/github-action-submit-signing-request` and needs manual approval |
| Azure Artifact Signing | US$9.99/mo (Basic) | **Not available**: individuals must be in US/Canada; Brazil isn't on the organization list either | The validated legal name | Same as any OV: builds over time | Built in (`win.azureSignOptions` in v26; `win.sign: {type: "azure"}` in v27 alpha) |
| OV / IV certificate from a CA | SSL.com IV US$129/yr, plus eSigner US$180/yr (or a US$379 YubiKey). Certum Open Source cloud from €49 (out of stock) | ID check with a government document. Key must sit in hardware or a cloud HSM | The maintainer's own name (Certum adds the "Open Source Developer" prefix) | Same as SignPath: builds over time, carries across releases | `win.signtoolOptions.sign` custom hook calling the CA's cloud signer; a USB token is useless on hosted runners |
| EV certificate | Higher. Organizations only (SSL.com sells a "Sole Proprietor EV") | Business registration | Company name | **No instant bypass since 2024**: same as OV | Hardware-bound key: same CI problem as OV |

## 1. Shipping unsigned

- **What the user sees.** For an unsigned file, Microsoft's table says: "Warning — 'Windows protected your PC'; User must choose 'Run anyway' before the app can run. Enterprise policy can prevent continuation entirely." ([Microsoft Learn, SmartScreen reputation](https://learn.microsoft.com/en-us/windows/apps/package-and-deploy/smartscreen-reputation)). "Run anyway" appears only after clicking "More info"; one Electron app quotes the full dialog ([meetyan/raise README](https://github.com/meetyan/raise/blob/7fd970899f2cda35a58564b23acd20cdf3fef619/README.md)). A self-signed certificate behaves "Same as no signature" ([same page](https://learn.microsoft.com/en-us/windows/apps/package-and-deploy/smartscreen-reputation)).
- **Mark of the Web.** Windows adds MotW "to files from an untrusted location, such as the internet" ([Microsoft Learn, Office MotW](https://learn.microsoft.com/en-us/deployoffice/security/internet-macros-blocked)). It is stored in the `Zone.Identifier` stream as `ZoneId=3` ([MS-FSCC](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-fscc/6e3f7352-d11c-4d76-8c39-2516a9df36e8)). SmartScreen "checks any files an app (including 3rd-party browsers and email clients) that attempts to download and run" ([SmartScreen overview](https://learn.microsoft.com/en-us/windows/security/operating-system-security/virus-and-threat-protection/microsoft-defender-smartscreen/)). For Bat-Signal, the downloaded file is the NSIS installer, so the prompt comes up when the installer runs. `Bat-Signal.exe` is unpacked by the installer and carries no MotW (inferred, not tested).
- **Browser download warnings.** SmartScreen, which is built into Edge, checks downloads "against a list of files that are well known and downloaded frequently. If the file isn't on that list, Microsoft Defender SmartScreen shows a warning" ([SmartScreen overview](https://learn.microsoft.com/en-us/windows/security/operating-system-security/virus-and-threat-protection/microsoft-defender-smartscreen/)). Chrome flags "uncommon" downloads through Safe Browsing ([Chrome Help](https://support.google.com/chrome/answer/6261569?hl=en), [Chrome Enterprise Help](https://support.google.com/chrome/a/answer/7579271)). The exact button labels in today's Edge and Chrome ("Keep", "Keep anyway") are **unverified**.
- **How reputation builds.** There are two signals, "Publisher reputation" and "File hash reputation". "When a file is not signed, SmartScreen reputation must build for each new version of your files, starting with zero reputation." The prompt stops "once the file hash has sufficient download history … it can take several weeks and hundreds of clean installs" ([SmartScreen reputation](https://learn.microsoft.com/en-us/windows/apps/package-and-deploy/smartscreen-reputation)). For an unsigned app with small, frequent releases, the prompt is effectively permanent.
- **Smart App Control (Windows 11).** "Malware, Potentially Unwanted Apps (PUA), and unknown, unsigned code are blocked by default." In enforcement mode, "Apps cannot be run unless they are recognized by Microsoft's app intelligence services, or they are signed with a trusted certificate" ([Microsoft Learn, Smart App Control](https://learn.microsoft.com/en-us/windows/apps/develop/smart-app-control/overview)). "There is currently no way to bypass Smart App Control protection for individual apps." Recent updates let it be turned on without a clean install ([Microsoft Support, SAC](https://support.microsoft.com/en-us/topic/what-is-smart-app-control-285ea03d-fa88-4d56-882e-6698afdb7003)). Its checks "apply to all executable files, not just those downloaded from the Internet" ([SmartScreen reputation](https://learn.microsoft.com/en-us/windows/apps/package-and-deploy/smartscreen-reputation)). So yes: an unsigned Bat-Signal is blocked outright on a SAC-enforcing PC. How many users run SAC in enforcement mode: **unverified**.
- **Electron's own binaries are unsigned.** Checked locally with `Get-AuthenticodeSignature` on `app/node_modules/electron/dist` (Electron 44.5.1). `electron.exe`, `ffmpeg.dll`, `vk_swiftshader.dll`, `vulkan-1.dll` and `dxcompiler.dll` are `NotSigned`; only `d3dcompiler_47.dll` and `dxil.dll` carry Microsoft signatures. Even with a signed `Bat-Signal.exe`, these DLLs stay unsigned unless they go into `signExts`. Whether SAC then blocks those DLL loads is **unverified**.

## 2. SignPath Foundation (free for OSS)

- **Eligibility** ([signpath.org/terms](https://signpath.org/terms)): an "OSI-approved Open Source license without commercial dual-licensing for all components"; "no proprietary, non open-source component"; "actively maintained"; "already be released in the form that should be signed"; functionality "described on its download page"; no malware or PUPs; no hacking tools. MIT passes. Open question: the bundled sounds are CC0 and CC0 is not OSI-approved. Whether SignPath counts media assets as "components" is **unverified**; ask in the application.
- **Reputation is judged.** "For executable programs that may be downloaded and executed based on our signature, we require a certain verifiable reputation", and "We're under no obligation to accept your project" ([terms](https://signpath.org/terms)). The thresholds (stars, downloads, age) and the review timeline are not published: **unverified**. The apply page is a bare form ([signpath.org/apply](https://signpath.org/apply)).
- **Publisher name.** "The code signing certificate is issued to SignPath Foundation. This means that SignPath Foundation is the publisher" ([terms](https://signpath.org/terms)). Users will see "SignPath Foundation", not "Lucas Monteiro".
- **Obligations** ([terms](https://signpath.org/terms)):
  - MFA on GitHub and SignPath.
  - Named Authors, Reviewers and Approvers.
  - A "Code signing policy" section on the home page and the download page. It must contain the line "Free code signing provided by SignPath.io, certificate by SignPath Foundation", the team roles, and a privacy statement. Bat-Signal makes no network calls, so the stock sentence fits: "This program will not transfer any information to other networked systems unless specifically requested by the user…".
  - "Every release needs manual approval for signing."
  - "Binary artifacts must be built from source code in a verifiable way."
  - Product name and version metadata must match on every signed file.
  - The software must provide uninstallation; NSIS does.

  Whether a solo maintainer may hold all three roles is **unverified**. Many listed projects look like one-person efforts.
- **GitHub Actions.** Use `signpath/github-action-submit-signing-request` (v3 in the docs) after `actions/upload-artifact`. SignPath checks that "A build was actually performed by a GitHub workflow", that "Origin metadata is provided by GitHub … and can therefore not be forged", and, for OSS, that "All jobs … leading up to the signing request were executed on GitHub-hosted agents". `wait-for-completion` defaults to `true` with a 600-second timeout ([SignPath docs, GitHub](https://docs.signpath.io/trusted-build-systems/github)). Because a human must approve each request, raise the timeout. Heroic uses 1800 s.
- **Fit with electron-builder.** A `sign` hook can't easily be used: SignPath wants the file to arrive as a GitHub workflow artifact (inference from the docs above). The working pattern is the one in [Heroic Games Launcher](https://github.com/Heroic-Games-Launcher/HeroicGamesLauncher/blob/main/.github/workflows/draft-release-win.yml), which also uses electron-vite and electron-builder on `windows-latest` with `v*` tags:
  1. `electron-vite build`, then `electron-builder --win --x64 --dir`.
  2. Upload `dist/win-unpacked/<App>.exe`, sign it, copy it back.
  3. `electron-builder --win nsis --x64 --prepackaged dist/win-unpacked -p never`.
  4. Upload `dist/*.exe`, sign it, copy it back.
  5. Publish the release.

  Caveats:
  - In this flow electron-builder never has a signer, so the NSIS **uninstaller** inside the installer stays unsigned. electron-builder signs the uninstaller only through its own signing path (`computeScriptAndSignUninstaller` → `packager.signIf` in [NsisTarget.ts](https://github.com/electron-userland/electron-builder/blob/electron-builder%4026.17.0/packages/app-builder-lib/src/targets/nsis/NsisTarget.ts)).
  - If `electron-updater` is added later, `latest.yml` holds the installer's sha512 and must be regenerated after signing. Heroic runs `fixWindowsUpdateInfo.js` for this.
  - Heroic signs its renamed Electron exe. This suggests SignPath accepts it, although electron-builder only edits Electron's prebuilt binary (via resedit) rather than compiling it.

## 3. Azure Artifact Signing (formerly Trusted Signing)

- **Name and price.** It is now "Artifact Signing (formerly Trusted Signing)" ([SmartScreen reputation](https://learn.microsoft.com/en-us/windows/apps/package-and-deploy/smartscreen-reputation)). Basic is "$9.99/month for up to 5,000 signatures"; Premium is $99.99/month for 100,000 signatures; both charge $0.005 per extra signature ([Azure product page](https://azure.microsoft.com/en-us/products/artifact-signing)). Billing is not pro-rated, and free, trial or sponsored subscriptions don't work ([FAQ](https://learn.microsoft.com/en-us/azure/artifact-signing/faq)).
- **Eligibility. This rules it out.** "Public Trust certificates are available to organizations in the United States, Canada, the European Union, the United Kingdom, Australia, New Zealand, Japan, South Korea, Singapore, Switzerland, Norway, and Israel. **Individual developers must be located in the United States or Canada.**" ([Quickstart, prerequisites](https://learn.microsoft.com/en-us/azure/artifact-signing/quickstart)). There is a Brazil South *region* for hosting the service, but that doesn't make Brazilian identities eligible.
- **Identity validation.** For individuals, the details come from an Azure billing account of type Individual. Verification is a Verified ID through AU10TIX: government ID plus a face check, finished in Microsoft Authenticator. Organizations wait "from 1 to 20 business days" ([Quickstart](https://learn.microsoft.com/en-us/azure/artifact-signing/quickstart)). No custom CN or O is allowed, and no EV certificates are issued ([FAQ](https://learn.microsoft.com/en-us/azure/artifact-signing/faq)).
- **SmartScreen.** No instant reputation: "The prompt stops appearing once the file hash has sufficient download history" ([FAQ](https://learn.microsoft.com/en-us/azure/artifact-signing/faq)). Microsoft lists it as "reputation accumulates over time" ([SmartScreen reputation](https://learn.microsoft.com/en-us/windows/apps/package-and-deploy/smartscreen-reputation)).
- **Tooling.**
  - electron-builder v26: `win.azureSignOptions` (`publisherName`, `endpoint`, `certificateProfileName`, `codeSigningAccountName`), with `AZURE_TENANT_ID`, `AZURE_CLIENT_ID` and `AZURE_CLIENT_SECRET` as env vars ([docs at 26.17.0](https://github.com/electron-userland/electron-builder/blob/electron-builder%4026.17.0/website/docs/features/code-signing/code-signing-win.md)).
  - v27 alpha moves this to `win.sign: { type: "azure" }`, adds `AZURE_FEDERATED_TOKEN_FILE` for GitHub OIDC, and marks it Beta ([docs on master](https://github.com/electron-userland/electron-builder/blob/master/website/docs/features/code-signing/code-signing-win.md)).
  - Microsoft's own action is [azure/artifact-signing-action](https://github.com/azure/artifact-signing-action) ([integrations](https://learn.microsoft.com/en-us/azure/artifact-signing/how-to-signing-integrations)).

## 4. OV / IV and EV certificates from a CA

- **Hardware key rule.** CA/B Forum Code Signing BRs §6.2.7.4, effective 2023-06-01: "CAs SHALL ensure that the Subscriber's Private Key is generated, stored, and used in a suitable Hardware Crypto Module" (FIPS 140-2 Level 2 or equivalent). Since 2026-03-01, "the validity period MUST NOT exceed 460 days" ([CA/B Forum CSBR](https://cabforum.org/working-groups/code-signing/requirements/)). For CI this rules out a `.pfx` in a secret. The options are the CA's cloud HSM, or your own cloud HSM with an attestation fee. A USB token can't be plugged into a GitHub-hosted runner.
- **Prices, individual-friendly products.**
  - **SSL.com IV Code Signing**: "Personal name verified, no business required". US$129/yr for 1 year, down to US$96.75/yr for 5 years. YubiKey +US$379 ([SSL.com IV](https://www.ssl.com/products/software-integrity/code-signing/iv/)). eSigner cloud signing for CI: Tier 1 is US$20/month or US$180/year for 20 signings/month ([eSigner pricing](https://www.ssl.com/guide/esigner-pricing-for-code-signing/)). With the default dual signing (sha1 + sha256) of the app exe, uninstaller and installer, one release uses about 6 signings.
  - **Certum Open Source Code Signing**: cloud (SimplySign) from €49, or card plus reader from €69. The subject is "natural person data prefixed with 'Open Source Developer' phrase". Both listings showed "out of stock" on 2026-10-07 ([cloud](https://shop.certum.eu/open-source-code-signing-on-simplysign.html), [card set](https://shop.certum.eu/open-source-code-signing.html)).
  - Whether either CA vets Brazilian individuals: neither page states a country restriction. **Unverified.**
- **EV.** "EV certificates no longer bypass SmartScreen … Paying a premium for EV solely to avoid SmartScreen warnings is no longer justified" ([SmartScreen reputation](https://learn.microsoft.com/en-us/windows/apps/package-and-deploy/smartscreen-reputation)). The behaviour "changed in 2024" when Microsoft removed EV-specific OIDs from the Trusted Root Program ([distribution feature status](https://learn.microsoft.com/en-us/windows/apps/package-and-deploy/distribution-feature-status)). SSL.com sells EV to organizations, plus a "Sole Proprietor EV" ([SSL.com code signing](https://www.ssl.com/certificates/code-signing/)). That would need a registered business; whether a Brazilian MEI qualifies is **unverified**.
- **electron-builder hooks (v26).**
  - `win.signtoolOptions` accepts `certificateFile`, `certificateSubjectName` and `signingHashAlgorithms`.
  - `win.signtoolOptions.sign` takes a custom function or script path, which electron-builder calls for every file it signs. That covers the app exe, the uninstaller and the installer, plus anything matched by `signExts` (e.g. `".dll"`).
  - `signtoolOptions` and `azureSignOptions` are mutually exclusive ([winOptions.ts at 26.17.0](https://github.com/electron-userland/electron-builder/blob/electron-builder%4026.17.0/packages/app-builder-lib/src/options/winOptions.ts)).

  A cloud-HSM certificate plugs in through this hook (eSigner's CodeSignTool, for example). That is a cleaner fit than SignPath's two-pass build.

## 5. How other open-source Electron apps handle it

- **Home Assistant Tray Menu** (Electron Forge, a tray app like ours, unsigned): "A 'Windows protected your PC' message will pop up, click 'More info' and then 'Run anyway' This is a precaution from Windows because this application is not signed." ([README](https://github.com/PascalLuginbuehl/home-assistant-tray-menu/blob/56851a020c86be346d78f37da162e69819acd503/README.md))
- **Raise** (Electron, unsigned): "If it's your first time to open Raise, you might see a screen saying `Windows protected your PC…`. To bypass it, click `More Info` and then click `Run anyway`. This is simply because Raise on Windows is not yet code signed." ([README](https://github.com/meetyan/raise/blob/7fd970899f2cda35a58564b23acd20cdf3fef619/README.md))
- **Heroic Games Launcher** (electron-vite + electron-builder, SignPath Foundation): "Thanks Signpath for providing free signing of Windows binaries" ([README](https://github.com/Heroic-Games-Launcher/HeroicGamesLauncher/blob/main/README.md)); the full two-pass workflow is in [draft-release-win.yml](https://github.com/Heroic-Games-Launcher/HeroicGamesLauncher/blob/main/.github/workflows/draft-release-win.yml).
- **Kando** (Electron Forge, SignPath Foundation): "a huge thanks … to the SignPath Foundation for providing a free code signing certificate for the Windows installers!", with a dedicated [Code-Signing Policy](https://kando.menu/code-signing/) page ([README](https://github.com/kando-menu/kando/blob/main/README.md)).
- Other Electron apps on the [SignPath Foundation project list](https://signpath.org/projects) include Super Productivity, X Minecraft Launcher, PicGo and VSCodium.

## Recommendation for v1.0

1. **Release unsigned.** Configure electron-builder with no signer and keep `signAndEditExecutable` on, so icon and version metadata are still written.
2. **Make the unsigned path trustworthy.** The release workflow writes `SHA256SUMS.txt` and attaches it to the GitHub Release. The README gets the snippet below. The download link points only at GitHub Releases.
3. **Prepare for SignPath now.** These steps are cheap and are what the application checks:
   - Turn on GitHub MFA.
   - Add a "Code signing policy" section to the README with team roles and the no-network privacy sentence.
   - Keep the release build fully on GitHub-hosted runners, driven from the tag.
   - Make sure `productName` and the version are set on the exe.
4. **Apply to SignPath Foundation the day v1.0 is published.** Mention the CC0 sounds and the fact that Electron's own DLLs ship unsigned.
5. **Don't buy EV. Don't wait for Azure** while it is limited to US/CA individuals.

## Path later

- **SignPath accepted:** move the release job to the Heroic two-pass flow. Add the SignPath acknowledgement and policy line. Test on a Windows 11 machine with Smart App Control **On**: does the signed `Bat-Signal.exe` start, or do the unsigned Electron DLLs trip SAC?
- **SignPath rejected, or no answer after about 4 weeks:** trigger to revisit is either users reporting Smart App Control blocks or the "Run anyway" step showing up in issues as an install drop-off. Then buy SSL.com IV with eSigner Tier 1 (about US$309 in year one). Wire it through `win.signtoolOptions.sign`. Check first that SSL.com will validate a Brazilian ID.
- **Azure Artifact Signing:** check the [Quickstart prerequisites](https://learn.microsoft.com/en-us/azure/artifact-signing/quickstart) before each major release. If Brazilian individuals become eligible, it is the cheapest paid option (US$9.99/mo) and electron-builder supports it natively.
- **Microsoft Store:** registration is free for individual developers ([Microsoft Learn](https://learn.microsoft.com/en-us/windows/apps/publish/whats-new-individual-developer)). Store apps "are never subject to SmartScreen download warnings" ([SmartScreen reputation](https://learn.microsoft.com/en-us/windows/apps/package-and-deploy/smartscreen-reputation)), and MSIX gets "Free Microsoft code signing" ([MSI/EXE requirements](https://learn.microsoft.com/en-us/windows/apps/publish/publish-your-app/msi/app-package-requirements)). An EXE/MSI submission still needs a CA-signed installer. An extra `appx` target would be a separate, free channel. It doesn't fix the GitHub download.

## README snippet (ready to paste)

```markdown
### "Windows protected your PC"

Bat-Signal's installer is not code-signed yet. A signing certificate costs money and identity
paperwork, and this is a one-person open-source project, so v1.0 ships without one. Windows
SmartScreen warns about any new, unsigned download — it says nothing about what the app does.

1. Download the installer only from this repository's [Releases page](https://github.com/lucas-moont/bat-signal/releases).
2. Optional: check the file against `SHA256SUMS.txt` from the same release:
   `Get-FileHash .\Bat-Signal-Setup-1.0.0.exe -Algorithm SHA256`
3. If your browser says the file isn't commonly downloaded, choose to keep it.
4. When Windows shows "Windows protected your PC", click **More info**, check the app name,
   then click **Run anyway**.

If **Smart App Control** is on (Windows 11, under Windows Security → App & browser control),
Windows blocks unsigned apps and offers no "Run anyway". There is no per-app exception. We'd
rather you wait for a signed release than turn off a security feature for us.
Signed builds are planned; see the code signing policy below once it lands.
```

## Unverified items

- SignPath Foundation's review timeline and reputation thresholds; whether a solo maintainer may hold every role; whether CC0 assets count as non-OSI "components".
- Exact Edge/Chrome download-warning button labels in 2026.
- How many Windows 11 users run Smart App Control in enforcement mode; whether SAC blocks unsigned Electron DLLs loaded by a signed exe.
- Whether SSL.com or Certum validate individuals resident in Brazil; whether a Brazilian MEI qualifies for "Sole Proprietor EV".
- That the installed `Bat-Signal.exe` carries no Mark of the Web (inferred from how NSIS extracts files; not tested).

## Sources

- Microsoft Learn: [SmartScreen reputation for Windows app developers](https://learn.microsoft.com/en-us/windows/apps/package-and-deploy/smartscreen-reputation) · [Distribution feature status (EV change)](https://learn.microsoft.com/en-us/windows/apps/package-and-deploy/distribution-feature-status) · [Microsoft Defender SmartScreen overview](https://learn.microsoft.com/en-us/windows/security/operating-system-security/virus-and-threat-protection/microsoft-defender-smartscreen/) · [Smart App Control](https://learn.microsoft.com/en-us/windows/apps/develop/smart-app-control/overview) · [MS-FSCC Zone.Identifier](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-fscc/6e3f7352-d11c-4d76-8c39-2516a9df36e8) · [Office: MotW](https://learn.microsoft.com/en-us/deployoffice/security/internet-macros-blocked) · [MSI/EXE Store requirements](https://learn.microsoft.com/en-us/windows/apps/publish/publish-your-app/msi/app-package-requirements) · [Free individual developer registration](https://learn.microsoft.com/en-us/windows/apps/publish/whats-new-individual-developer)
- Microsoft Support: [What is Smart App Control?](https://support.microsoft.com/en-us/topic/what-is-smart-app-control-285ea03d-fa88-4d56-882e-6698afdb7003)
- Azure Artifact Signing: [Overview](https://learn.microsoft.com/en-us/azure/artifact-signing/overview) · [Quickstart](https://learn.microsoft.com/en-us/azure/artifact-signing/quickstart) · [FAQ](https://learn.microsoft.com/en-us/azure/artifact-signing/faq) · [Signing integrations](https://learn.microsoft.com/en-us/azure/artifact-signing/how-to-signing-integrations) · [Product page and pricing](https://azure.microsoft.com/en-us/products/artifact-signing)
- SignPath: [Foundation terms](https://signpath.org/terms) · [Projects](https://signpath.org/projects) · [Apply](https://signpath.org/apply) · [GitHub integration docs](https://docs.signpath.io/trusted-build-systems/github)
- electron-builder: [Windows code signing doc @26.17.0](https://github.com/electron-userland/electron-builder/blob/electron-builder%4026.17.0/website/docs/features/code-signing/code-signing-win.md) · [same doc on master (v27)](https://github.com/electron-userland/electron-builder/blob/master/website/docs/features/code-signing/code-signing-win.md) · [winOptions.ts @26.17.0](https://github.com/electron-userland/electron-builder/blob/electron-builder%4026.17.0/packages/app-builder-lib/src/options/winOptions.ts) · [NsisTarget.ts @26.17.0](https://github.com/electron-userland/electron-builder/blob/electron-builder%4026.17.0/packages/app-builder-lib/src/targets/nsis/NsisTarget.ts)
- CA/Browser Forum: [Code Signing Baseline Requirements](https://cabforum.org/working-groups/code-signing/requirements/)
- CAs: [SSL.com code signing](https://www.ssl.com/certificates/code-signing/) · [SSL.com IV](https://www.ssl.com/products/software-integrity/code-signing/iv/) · [SSL.com eSigner pricing](https://www.ssl.com/guide/esigner-pricing-for-code-signing/) · [Certum OSS cloud](https://shop.certum.eu/open-source-code-signing-on-simplysign.html) · [Certum OSS card set](https://shop.certum.eu/open-source-code-signing.html)
- Google: [Chrome blocks some downloads](https://support.google.com/chrome/answer/6261569?hl=en) · [Chrome Enterprise: prevent harmful downloads](https://support.google.com/chrome/a/answer/7579271)
- Examples: [Heroic workflow](https://github.com/Heroic-Games-Launcher/HeroicGamesLauncher/blob/main/.github/workflows/draft-release-win.yml) · [Heroic README](https://github.com/Heroic-Games-Launcher/HeroicGamesLauncher/blob/main/README.md) · [Kando README](https://github.com/kando-menu/kando/blob/main/README.md) · [Home Assistant Tray Menu README](https://github.com/PascalLuginbuehl/home-assistant-tray-menu/blob/56851a020c86be346d78f37da162e69819acd503/README.md) · [Raise README](https://github.com/meetyan/raise/blob/7fd970899f2cda35a58564b23acd20cdf3fef619/README.md)
