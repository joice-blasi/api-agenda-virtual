import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactsRepository } from './repositories/contacts.repository';

@Injectable()
export class ContactsService {
  constructor(private contactRepository: ContactsRepository) { }

  async create(createContactDto: CreateContactDto) {
    const findName = await this.contactRepository.findByName(createContactDto.name)
    if (findName) {
      throw new ConflictException('Name already registered')
    }
    const contact = await this.contactRepository.create(createContactDto)
    return contact
  }

  async findAll() {
    const contacts = await this.contactRepository.findAll()
    return contacts
  }

  async findOne(id: string) {
    const contact = await this.contactRepository.findOne(id)
    if (!contact) {
      throw new NotFoundException('Contact not found')
    }
    return contact
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    const contact = await this.contactRepository.findOne(id)
    if (!contact) {
      throw new NotFoundException('Contact not found')
    }
    if (updateContactDto.name) {
      const findName = await this.contactRepository.findByName(updateContactDto.name)
      if (findName) {
        throw new ConflictException('Name already registered')
      }
    }
    const newContact = await this.contactRepository.update(id, updateContactDto)
    return newContact
  }

  async remove(id: string) {
    const contact = await this.contactRepository.findOne(id)
    if (!contact) {
      throw new NotFoundException('Contact not found')
    }
    await this.contactRepository.delete(id)
    return
  }
}
