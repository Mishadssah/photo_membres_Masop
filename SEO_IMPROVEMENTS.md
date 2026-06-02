# Ameliorations SEO - bloc a reutiliser

Ce document contient les balises SEO de reference a reutiliser dans la balise head des pages publiques.

## 1) Meta de base

```html
<meta name="description" content="MASOP - Maison de Soins Psychologiques. Organisation haitienne dediee a la sante mentale, formation en protection de l'enfance et prevention de la violence basee sur le genre (VBG).">
<meta name="keywords" content="sante mentale Haiti, protection enfance, VBG, psychologie, MASOP, Port-au-Prince">
<meta name="author" content="MASOP - Maison de Soins Psychologiques">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

## 2) Open Graph

```html
<meta property="og:type" content="website">
<meta property="og:url" content="https://masop.ht">
<meta property="og:title" content="MASOP - Maison de Soins Psychologiques">
<meta property="og:description" content="Organisation haitienne de sante mentale. Protection enfance, formations, prevention VBG.">
<meta property="og:image" content="https://masop.ht/logo_masop_rev2.png">
<meta property="og:locale" content="fr_HT">
```

## 3) Twitter Card

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@MASOP_Haiti">
<meta name="twitter:title" content="MASOP - Sante Mentale en Haiti">
<meta name="twitter:description" content="Maison de Soins Psychologiques - Protection, Formation, Impact">
<meta name="twitter:image" content="https://masop.ht/logo_masop_rev2.png">
```

## 4) Canonical

```html
<link rel="canonical" href="https://masop.ht">
```

## 5) Google Analytics 4

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 6) Donnees structurees Schema.org

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "MASOP - Maison de Soins Psychologiques",
  "url": "https://masop.ht",
  "logo": "https://masop.ht/logo_masop_rev2.png",
  "description": "Organisation haitienne dediee a la sante mentale et protection de l'enfance",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "9, Rue Etheard, Delmas 39",
    "addressLocality": "Port-au-Prince",
    "addressCountry": "HT"
  },
  "telephone": "+509-41957895",
  "email": "contact@masop.care",
  "sameAs": [
    "https://facebook.com/MASOP",
    "https://instagram.com/MASOP"
  ],
  "founders": [
    {
      "@type": "Person",
      "name": "Ulrick Edouard"
    }
  ],
  "foundingDate": "2021",
  "areaServed": "HT"
}
</script>
```

## 7) Favicons

```html
<link rel="icon" type="image/png" href="logo_masop_rev2.png">
<link rel="apple-touch-icon" href="logo_masop_rev2.png">
```

## 8) Preconnect

```html
<link rel="preconnect" href="https://cdn.tailwindcss.com">
<link rel="preconnect" href="https://cdnjs.cloudflare.com">
<link rel="dns-prefetch" href="https://fonts.googleapis.com">
```

## 9) Robots

```html
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
```

## 10) Langue

```html
<html lang="fr">
<meta http-equiv="Content-Language" content="fr">
```
