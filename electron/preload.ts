import { ipcRenderer, contextBridge } from 'electron'
import { OpenCashRegisterDTO } from '../shared/dtos/OpenCashRegisterDTO'
import { CloseCashRegisterDTO } from '../shared/dtos/CloseCashRegisterDTO'
import { AddCashMovementDTO } from '../shared/dtos/AddCashMovementDTO'
import { updateCashMovementDTO } from 'shared/dtos/updateCashMovement'

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },

  // You can expose other APTs you need here.
  // ...
})
contextBridge.exposeInMainWorld('API', {
  openCashRegister(data: OpenCashRegisterDTO) {
    return ipcRenderer.invoke('open-cash', data)
  },

  getOpenCashRegister() {
    return ipcRenderer.invoke('getOpenCash')
  },

  closeCashRegister(data: CloseCashRegisterDTO) {
    return ipcRenderer.invoke('closeCashRegister', data)
  },

  addCashMovement(data: AddCashMovementDTO) {
    return ipcRenderer.invoke('addMovement', data)
  },

  findManyMovement(data: string) {
    return ipcRenderer.invoke('findManyMovements', data)
  },

  deleteCashMovement(data: updateCashMovementDTO) {
    return ipcRenderer.invoke('deleteMovement', data)
  },

  findAllCashRegisterClosed() {
    return ipcRenderer.invoke('findAllCashRegisterClosed')
  },

  getCashRegister(data: string) {
    return ipcRenderer.invoke('getCashRegister', data)
  },
})
