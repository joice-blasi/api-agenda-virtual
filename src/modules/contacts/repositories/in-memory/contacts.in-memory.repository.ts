import { Injectable } from "@nestjs/common"
import { ContactsRepository } from "../contacts.repository"
import { CreateContactDto } from "../../dto/create-contact.dto"
import { Contact } from "../../entities/contact.entity"
import { UpdateContactDto } from "../../dto/update-contact.dto"

@Injectable()
export class ContactsInMemoryRepository implements ContactsRepository {
  private database: Contact[] = []

  create(data: CreateContactDto, userId: string): Contact | Promise<Contact> {
    const newContact = new Contact()
    Object.assign(newContact, { ...data, userId })
    this.database.push(newContact)
    return newContact
  }

  findAll(): Contact[] | Promise<Contact[]> {
    return this.database
  }

  findOne(id: string): Contact | Promise<Contact> {
    const contact = this.database.find((contact) => contact.id === id)
    return contact
  }

  findByName(name: string): Contact | Promise<Contact> {
    const contact = this.database.find((contact) => contact.name === name)
    return contact
  }

  update(id: string, data: UpdateContactDto): Contact | Promise<Contact> {
    const contactIndex = this.database.findIndex((contact) => contact.id === id)
    this.database[contactIndex] = {
      ...this.database[contactIndex],
      ...data
    }
    return this.database[contactIndex]
  }

  delete(id: string): void | Promise<void> {
    const contactIndex = this.database.findIndex((contact) => contact.id === id)
    this.database.splice(contactIndex, 1)
  }

}