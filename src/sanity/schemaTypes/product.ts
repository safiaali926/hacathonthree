

import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'product', // Unique identifier for this schema
  title: 'Product', // Display title in Sanity Studio
  type: 'document', // Declares this as a document type
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(3).max(100),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'originalPrice',
      title: 'Original Price',
      type: 'number',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true, // Allows you to crop and focus the image
      },
    }
    ),
    defineField({
      name: 'colors',
      title: 'Colors',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.max(500),
    }),
    defineField({
      name: 'sale',
      title: 'Sale',
      type: 'boolean',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'code',
      title: 'Code',
      type: 'string',
      validation: (Rule) => Rule.max(50),
    }),
    defineField({
      name: 'id',
      title: 'Product ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],


}

);

