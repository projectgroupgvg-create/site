import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'post',
  title: 'Стаття блогу / Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      title: 'Мова / Language',
      type: 'string',
      options: {
        list: [
          { title: 'Українська', value: 'uk' },
          { title: 'English', value: 'en' },
          { title: 'Deutsch', value: 'de' },
          { title: 'Français', value: 'fr' },
        ],
      },
      initialValue: 'uk',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Заголовок',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Короткий опис',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(240),
    }),
    defineField({
      name: 'mainImage',
      title: 'Головне зображення',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'category',
      title: 'Категорія',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'author',
      title: 'Автор',
      type: 'reference',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Дата публікації',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Текст статті',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: { title: 'title', media: 'mainImage', subtitle: 'language' },
  },
});
