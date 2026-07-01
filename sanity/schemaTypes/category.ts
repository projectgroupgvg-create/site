import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'category',
  title: 'Категорія / Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Назва',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
