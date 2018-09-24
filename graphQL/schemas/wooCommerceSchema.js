const wooCommerceSchema = `
  type Category {
    # Products list
    details: Taxonomy,
    products: Products,
    filters: JSON
  }
  type Taxonomy {
    # Individual Taxonomy
    id: Int
    name: String,
    slug: String,
    description: String,
    image: CategoryImage,
    parent: Int,
    count: Int
  }
  type Products {
    items: [Product],
    totalProducts: Int
    totalPages: Int
  }
  type CategoryInfo {
    # CategoryInfo
    id: Int,
    name: String,
    slug: String
  }
  type Product {
    # Product
    sku: String
    id: Int
    name: String,
    slug: String,
    description: String,
    short_description: String,
    images: [ProductImage],
    price: Float,
    regular_price: Float,
    sale_price: Float,
    price_html: String,
    attributes: [Attribute],
    categories: [CategoryInfo],
    in_stock: Boolean,
    on_sale: Boolean,
    stock_quantity: Int,
    type: String,
    featured: Boolean,
    catalog_visibility: String,
    relatedProducts: [Product],
    variations: JSON,
    variation_attributes: JSON,
    parent: Int,
    count: Int
  }
  type CategoryImage {
    # Category image
    src: String,
    alt: String
  }
  type ProductImage {
    # Product image
    src: String,
    alt: String,
    position: Int
  }
  type Attribute {
    # Product Attribute
    id: Int,
    name: String,
    slug: String,
    taxonomy: String,
    position: Int,
    visible: Boolean,
    options: [Option],
    swatches: JSON
  }
  type Option {
    id: Int,
    name: String,
    slug: String,
    taxonomy: String,
    description: String,
    count: Int
  }
  type Query {
    productcategory (slug: String, page: Int, filters: JSON): Category
    product (slug: String): Product
  }
`;

export default wooCommerceSchema;
