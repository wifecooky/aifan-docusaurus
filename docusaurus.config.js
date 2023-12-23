// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes } = require('prism-react-renderer');
const lightTheme = themes.github;
const darkTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'thewang',
  tagline: '整理技术知识，记录生活点滴。',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://thewang.net',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'wifecooky', // Usually your GitHub org/user name.
  projectName: 'thewang', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "zh-Hans",
    locales: ["en", "zh-Hans", "ja"],
    localeConfigs: {
      en: {
        label: "English",
      },
      "zh-Hans": {
        label: "简体中文",
      },
      ja: {
        label: "日本語",
      },
    },
  },

  // Add plugins here
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        createRedirects(existingPath) {
          if (existingPath.includes('/weekly')) {
            // Redirect from /docs to /weekly
            return [
              existingPath.replace('/weekly', '/docs'),
            ];
          }
          return undefined; // Return a falsy value: no redirect created
        },
      },
    ]
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: 'weekly',
          sidebarPath: require.resolve('./sidebars.js'),
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
          sidebarCollapsed: false,
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/social-card.png',
      // Metadatas for your site
      metadata: [{ name: 'keywords', content: 'programming, AI, tokyo, hangzhou' }],
      navbar: {
        title: 'thewang',
        logo: {
          alt: 'thewang logo',
          src: 'img/logo.png',
        },
        items: [
          // {
          //   type: 'docSidebar',
          //   sidebarId: 'tutorialSidebar',
          //   position: 'left',
          //   label: 'Tutorial',
          // },
          { to: '/blog', label: 'Blog', position: 'left' },
          // language dropdown menu
          {
            type: 'localeDropdown',
            position: 'right',
          },
          // Weekly docs
          {
            to: '/weekly',
            type: 'docSidebar',
            sidebarId: 'weeklySidebar',
            label: '遥遥周刊',
            position: 'left',
          },
          // tags menu
          {
            to: '/blog/tags',
            label: 'Tags',
            position: 'left',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Community',
            items: [
              {
                label: 'Twitter',
                href: 'https://twitter.com/wifecooky',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} thewang Built with Docusaurus.`,
      },
      prism: {
        theme: lightTheme,
        darkTheme: darkTheme,
      },

      // Algolia search
      algolia: {
        // The application ID provided by Algolia
        appId: '962I5C6433',

        // Public API key: it is safe to commit it
        apiKey: '69ab7c94b8d2847a607e4c1fc5e857f3',

        indexName: 'thewang',

        // Optional: see doc section below
        contextualSearch: true,
      },
      // Mermaid configuration
      mermaid: {
        options: {
          gitGraph: { rotateCommitLabel: false },
        },
      },

      // feed options
      feedOptions: {
        type: 'all',
        title: 'thewang',
        description: '整理技术知识，记录生活点滴。',
        link: 'https://thewang.net',
        language: 'zh-CN',
      },
      // giscus options
      giscus: {
        repo: 'wifecooky/thewang-blog',
        repoId: 'R_kgDOKkyIvg',
        category: 'Announcements',
        categoryId: 'DIC_kwDOKkyIvs4CbcJ1',
      }
    }),
};

module.exports = config;
