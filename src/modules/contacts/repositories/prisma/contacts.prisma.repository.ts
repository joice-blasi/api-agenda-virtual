import { Injectable } from "@nestjs/common"
import { ContactsRepository } from "../contacts.repository"
import { CreateContactDto } from "../../dto/create-contact.dto"
import { UpdateContactDto } from "../../dto/update-contact.dto"
import { Contact } from "../../entities/contact.entity"
import { PrismaService } from "src/database/prisma.service"

@Injectable()
export class ContactsPrismaRepository implements ContactsRepository {
  constructor(private prisma: PrismaService) { }

  async create(data: CreateContactDto, userId: string): Promise<Contact> {
    const contact = new Contact()
    Object.assign(contact, { ...data })
    const newContact = await this.prisma.contact.create({
      data: {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        telephone: contact.telephone,
        createdAt: contact.createdAt,
        userId
      }
    })
    return newContact
  }

  async findAll(idAuth: string): Promise<Contact[]> {
    const contacts = await this.prisma.contact.findMany({
      where: {
        userId: idAuth
      }
    })
    return contacts
  }

  async findOne(id: string, idAuth: string): Promise<Contact> {
    const contact = await this.prisma.contact.findFirst({
      where: {
        id: id,
        userId: idAuth
      }
    })
    return contact
  }

  async findByName(name: string): Promise<Contact> {
    const contact = await this.prisma.contact.findUnique({
      where: { name }
    })
    return contact
  }

  async update(id: string, data: UpdateContactDto): Promise<Contact> {
    const contact = await this.prisma.contact.update({
      where: { id },
      data: { ...data }
    })
    return contact
  }

  async delete(id: string): Promise<void> {
    await this.prisma.contact.delete({
      where: { id }
    })
  }
}