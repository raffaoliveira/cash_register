import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'
import { app } from 'electron'
import { PrismaClient } from '@prisma/client'

// ES Modules: recriando __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function resolveDbPath(): string {
  const userDataPath = app.getPath('userData')
  const dbDestinationPath = path.join(userDataPath, 'dev.db')

  const isPackaged = app.isPackaged

  const dbSourcePath = isPackaged
    ? path.join(process.resourcesPath, 'prisma', 'dev.db')
    : path.join(__dirname, '..', 'prisma', 'dev.db')

  if (!fs.existsSync(dbDestinationPath)) {
    fs.copyFileSync(dbSourcePath, dbDestinationPath)
  }

  return dbDestinationPath
}
export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `file:${resolveDbPath().replace(/\\/g, '/')}`,
    },
  },
})
