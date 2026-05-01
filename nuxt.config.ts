export default defineNuxtConfig({
  compatibilityDate: '2026-03-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  nitro: {
    preset: 'node-server'
  },
  css: ['~/assets/css/main.css', '~/assets/css/urup-responsive.css'],
  runtimeConfig: {
    shopifyStorefrontToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    shopifyStoreDomain: process.env.SHOPIFY_STORE_DOMAIN,
    contactNotificationWebhookUrl: process.env.CONTACT_NOTIFICATION_WEBHOOK_URL,
    public: {
      siteName: 'Urupgaard',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    }
  },
  app: {
    head: {
      title: 'Urupgaard',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#efe6dc' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Allison&family=Mrs+Saint+Delafield&family=Inter:wght@400;500;600;700&display=swap'
        }
      ]
    }
  }
})
