import {defineField, defineType} from 'sanity'
export default defineType({
    name: 'banner',
    title: 'Banner',
    type: 'document',
    fields: [
        defineField( {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineType({
            name: 'buttonText',
            title: 'ButtonText',
            type: 'string',
        }),
        defineType({
            name: 'product',
            title: 'Product',
            type: 'string',
        }),
        defineType({
            name: 'desc',
            title: 'Desc',
            type: 'string',
        }),
        defineType({
            name: 'smallText',
            title: 'SmallText',
            type: 'string',
        }),
        defineType({
            name: 'midText',
            title: 'MidText',
            type: 'string',
        }),
        defineType({
            name: 'largeText1',
            title: 'LargeText1',
            type: 'string',
        }),
        defineType({
            name: 'largeText2',
            title: 'LargeText2',
            type: 'string',
        }),
        defineType({
            name: 'discount',
            title: 'Discount',
            type: 'string',
        }),
        defineType({
            name: 'saleTime',
            title: 'SaleTime',
            type: 'string',
        }),
    ],
  });