/// <reference types="vite-plugin-electron/electron-env" />

declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * The built directory structure
     *
     * ```tree
     * ├─┬─┬ dist
     * │ │ └── index.html
     * │ │
     * │ ├─┬ dist-electron
     * │ │ ├── main.js
     * │ │ └── preload.js
     * │
     * ```
     */
    APP_ROOT: string
    /** /dist/ or /public/ */
    VITE_PUBLIC: string
  }
}

// Used in Renderer process, expose in `preload.ts`
interface Window {
  ipcRenderer: import('electron').IpcRenderer
  API: {
    openCashRegister(data: OpenCashRegisterDTO): Promise<CashRegister>

    getOpenCashRegister(): Promise<CashRegister | null>

    closeCashRegister(data: CloseCashRegisterDTO): Promise<Boolean>

    addCashMovement(data: AddCashMovementDTO): Promise<CashMovement>

    findManyMovement(data: string): Promise<CashMovement[]>

    deleteCashMovement(data: string): Promise<boolean>

    findAllCashRegisterClosed(): Promise<CashRegister[]>

    getCashRegister(data: string): Promise<CashRegister | null>
  }
}
