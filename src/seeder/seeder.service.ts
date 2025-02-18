import { Injectable, OnModuleInit } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Brand, Category, Role, SkincareProduct } from 'src/typeorm/entities'
import { Repository } from 'typeorm'

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    @InjectRepository(SkincareProduct)
    private readonly productRepository: Repository<SkincareProduct>,
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ) {}

  async onModuleInit() {
//     console.log('🌱 Seeding Role...')
//     const defaultRoles = [{ roleName: 'Admin' }, { roleName: 'User' }]

//     for (const role of defaultRoles) {
//       const exists = await this.roleRepository.findOne({ where: { roleName: role.roleName } })
//       if (!exists) {
//         await this.roleRepository.save(role)
//       }
//     }

//     console.log('🌱 Seeding Categories and Brands...')

//     // ✅ Predefined category names
//     const categoryNames = [
//       'Cleanser',
//       'Toner',
//       'Moisturizer',
//       'Serum',
//       'Essence',
//       'Sunscreen',
//       'Exfoliator',
//       'Eye Cream',
//       'Face Mask',
//       'Night Cream'
//     ]

//     // ✅ Predefined brand names
//     const brandNames = [
//         { name: "Klairs", country: "South Korea", logo: "https://example.com/klairs.png" },
//         { name: "COSRX", country: "South Korea", logo: "https://example.com/cosrx.png" },
//         { name: "CeraVe", country: "USA", logo: "https://example.com/cerave.png" },
//         { name: "La Roche-Posay", country: "France", logo: "https://example.com/larocheposay.png" },
//         { name: "The Ordinary", country: "Canada", logo: "https://example.com/theordinary.png" },
//         { name: "L'Oréal Paris", country: "France", logo: "https://example.com/loreal.png" },
//         { name: "Neutrogena", country: "USA", logo: "https://example.com/neutrogena.png" },
//         { name: "Paula's Choice", country: "USA", logo: "https://example.com/paulaschoice.png" },
//         { name: "Olay", country: "USA", logo: "https://example.com/olay.png" },
//         { name: "Cetaphil", country: "USA", logo: "https://example.com/cetaphil.png" },
//         { name: "Eucerin", country: "Germany", logo: "https://example.com/eucerin.png" },
//         { name: "Bioderma", country: "France", logo: "https://example.com/bioderma.png" },
//         { name: "Aveeno", country: "USA", logo: "https://example.com/aveeno.png" },
//         { name: "Kiehl’s", country: "USA", logo: "https://example.com/kiehls.png" },
//         { name: "SK-II", country: "Japan", logo: "https://example.com/sk2.png" },
//         { name: "Shiseido", country: "Japan", logo: "https://example.com/shiseido.png" },
//         { name: "Drunk Elephant", country: "USA", logo: "https://example.com/drunkelephant.png" },
//         { name: "Tatcha", country: "Japan", logo: "https://example.com/tatcha.png" },
//         { name: "Estée Lauder", country: "USA", logo: "https://example.com/esteelauder.png" },
//         { name: "Clarins", country: "France", logo: "https://example.com/clarins.png" },
//         { name: "Lancôme", country: "France", logo: "https://example.com/lancome.png" },
//         { name: "Murad", country: "USA", logo: "https://example.com/murad.png" }
//     ];

//     // Insert categories if not exist
//     for (const name of categoryNames) {
//       const existingCategory = await this.categoryRepository.findOne({ where: { name: name } })
//       if (!existingCategory) {
//         const category = new Category()
//         category.name = name
//         await this.categoryRepository.save(category)
//       }
//     }

//     // Insert brands if not exist
//     for (const { name, country, logo } of brandNames) {
//         const existingBrand = await this.brandRepository.findOne({ where: { brandName: name } });
//         if (!existingBrand) {
//             const brand = new Brand();
//             brand.brandName = name;
//             brand.country = country;
//             brand.logo = logo;
//             await this.brandRepository.save(brand);
//         }
//     }

//     console.log('✅ Categories and Brands seeded successfully!')

//     console.log('🌱 Seeding Skincare Products...')

//     const categories = await this.categoryRepository.find()
//     const brandList = await this.brandRepository.find()

//     if (categories.length === 0 || brandList.length === 0) {
//       console.error('⚠️ Please insert some categories and brands first!')
//       return
//     }

//     // ✅ Expanded skincare product list
//     const skincareProducts = [
//       { name: 'Klairs Supple Preparation Toner', brand: 'Klairs', category: 'Toner', price: 22.99, stock: 50 },
//       {
//         name: 'COSRX Advanced Snail 96 Mucin Power Essence',
//         brand: 'COSRX',
//         category: 'Serum',
//         price: 23.0,
//         stock: 45
//       },
//       { name: 'CeraVe Hydrating Facial Cleanser', brand: 'CeraVe', category: 'Cleanser', price: 14.99, stock: 100 },
//       {
//         name: 'La Roche-Posay Toleriane Hydrating Gentle Cleanser',
//         brand: 'La Roche-Posay',
//         category: 'Cleanser',
//         price: 14.99,
//         stock: 80
//       },
//       {
//         name: 'The Ordinary Niacinamide 10% + Zinc 1%',
//         brand: 'The Ordinary',
//         category: 'Serum',
//         price: 6.5,
//         stock: 120
//       },
//       {
//         name: "L'Oréal Revitalift Hyaluronic Acid Serum",
//         brand: "L'Oréal Paris",
//         category: 'Serum',
//         price: 23.99,
//         stock: 60
//       },
//       {
//         name: 'Neutrogena Hydro Boost Water Gel',
//         brand: 'Neutrogena',
//         category: 'Moisturizer',
//         price: 18.99,
//         stock: 90
//       },
//       {
//         name: "Paula's Choice 2% BHA Liquid Exfoliant",
//         brand: "Paula's Choice",
//         category: 'Exfoliator',
//         price: 29.99,
//         stock: 55
//       },
//       {
//         name: 'Olay Regenerist Micro-Sculpting Cream',
//         brand: 'Olay',
//         category: 'Moisturizer',
//         price: 28.99,
//         stock: 70
//       },
//       { name: 'SK-II Facial Treatment Essence', brand: 'SK-II', category: 'Essence', price: 99.99, stock: 20 }
//     ]

//     // ✅ Expanding to 100 products with variations
//     const products: SkincareProduct[] = []

//     for (let i = 0; i < 100; i++) {
//       const data = skincareProducts[i % skincareProducts.length]

//       const category = categories.find((cat) => cat.name === data.category)
//       const brand = brandList.find((br) => br.brandName === data.brand)

//       if (!category || !brand) continue

//       const product = new SkincareProduct()
//       product.productName = `${data.name} - Version ${i + 1}`
//       product.description = `A highly effective ${data.category.toLowerCase()} by ${data.brand}.`
//       product.price = (data.price + (Math.random() * 5 - 2.5)).toFixed(2) as unknown as number
//       product.stock = Math.floor(Math.random() * (data.stock - 20)) + 20
//       product.category = category
//       product.brand = brand
//       product.isActive = Math.random() > 0.1 // 90% chance to be active
//       products.push(product)
//     }

//     await this.productRepository.save(products)
//     console.log('✅ 100 Skincare Products from Various Brands seeded successfully!')
  }
}
