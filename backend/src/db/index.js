import Database from 'better-sqlite3'
import { mkdirSync } from 'fs'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import config from '../config/index.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dbPath = config.dbPath.startsWith('./')
  ? config.dbPath.replace('./', __dirname + '/../../')
  : config.dbPath

mkdirSync(dirname(dbPath), { recursive: true })

const db = new Database(dbPath)
db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')

export default db
