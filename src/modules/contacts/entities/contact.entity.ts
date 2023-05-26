import { randomUUID } from "node:crypto"

export class Contact {
  readonly id: string
  name: string
  email: string
  telephone: string
  createdAt: Date

  constructor() {
    this.id = randomUUID()
    this.createdAt = new Date()
  }
}
