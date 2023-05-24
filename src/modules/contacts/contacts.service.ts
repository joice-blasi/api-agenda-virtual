import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactsRepository } from './repositories/contacts.repository';

@Injectable()
export class ContactsService {
  constructor(private contactRepository: ContactsRepository) { }

  async create(createContactDto: CreateContactDto) {
    const contact = await this.contactRepository.create(createContactDto)
    return contact
  }

  async findAll() {
    const contacts = await this.contactRepository.findAll()
    return contacts
  }

  async findOne(id: string) {
    const contact = await this.contactRepository.findOne(id)
    return contact
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    const contact = await this.contactRepository.update(id, updateContactDto)
    return contact
  }

  async remove(id: string) {
    await this.contactRepository.delete(id)
    return
  }
}
