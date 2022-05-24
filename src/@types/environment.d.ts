declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URI: string
      APP_SECRET: string
    }
  }
}

export { }