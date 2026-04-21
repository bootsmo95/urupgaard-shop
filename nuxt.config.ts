export default defineNuxtConfig({
  compatibilityDate: '2026-03-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  nitro: {
    preset: 'node-server'
  },
  css: ['~/assets/css/main.css'],
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
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&display=swap'
        }
      ]
    }
  }
})
