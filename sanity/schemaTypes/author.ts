import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'author',
  title: 'Автор / Author',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: "Ім'я", type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'role', title: 'Посада', type: 'string' }),
    defineField({ name: 'image', title: 'Фото', type: 'image', options: { hotspot: true } }),
  ],
});
