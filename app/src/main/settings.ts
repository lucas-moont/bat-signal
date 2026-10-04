import { parseSettings } from '../shared/settings'
import { jsonFile } from './jsonFile'

export const settingsFile = jsonFile('settings.json', parseSettings)
