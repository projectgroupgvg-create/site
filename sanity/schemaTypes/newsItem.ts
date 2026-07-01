import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'newsItem',
  title: 'Новина / News Item',
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
      name: 'newsType',
      title: 'Тип новини',
      type: 'string',
      options: {
        list: [
          { title: "Новини фірми / Firm news", value: 'firm-news' },
          { title: 'Нагороди / Awards', value: 'award' },
          { title: 'Справи / Deals', value: 'deal' },
        ],
      },
      initialValue: 'firm-news',
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
      name: 'publishedAt',
      title: 'Дата публікації',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Текст новини',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: { title: 'title', media: 'mainImage', subtitle: 'newsType' },
  },
});
