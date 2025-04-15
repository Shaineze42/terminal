import packageJson from '../../package.json';
import themes from '../../themes.json';
import { history } from '../stores/history';
import { theme } from '../stores/theme';

const hostname = window.location.hostname;

export const commands: Record<string, (args: string[]) => Promise<string> | string> = {
  // --- Commandes perso (ton contenu ici) ---
  about: () => 'Je suis Shaïneze, passionnée par la data, l’automatisation et l’impact social. J’aime transformer des idées en solutions concrètes, utiles et humaines.',

  projects: () => `Projets disponibles :
- gofusion.txt
- binko.txt
- malt.txt
- dataiku.txt
Tape 'cat [nom]' pour en savoir plus sur un projet.`,

  'cat gofusion.txt': () => 
    `🎮 Go Fusion :
Reprise d'une application écologique. Refonte UX, ajout de gamification, et proposition de partenariats LinkedIn pour moderniser et engager les utilisateurs.`,

  'cat binko.txt': () => 
    `🧠 Binko :
Création d’un système de génération d’images pour entraîner une IA à reconnaître les déchets. Utilisation d'une API et d'automatisation via code.`,

  'cat malt.txt': () => 
    `📢 Make + Malt :
Optimisation de campagnes publicitaires trop chargées. Croisement de données via Make pour envoyer des pubs personnalisées selon les profils visiteurs.`,

  'cat dataiku.txt': () => 
    `📊 Dataiku :
Projet de nettoyage et croisement de bases de données. Construction d’un pipeline complet d’analyse. Certification Dataiku validée.`,

  contact: () => 
    `📬 Contact :
Email : shaineze@gmail.com
LinkedIn : https://linkedin.com/in/shaineze`,

  // --- Commandes système par défaut ---
  help: () => 'Commandes disponibles : ' + Object.keys(commands).join(', '),
  hostname: () => hostname,
  whoami: () => 'guest',
  date: () => new Date().toLocaleString(),
  vi: () => `why use vi? try 'emacs'`,
  vim: () => `why use vim? try 'emacs'`,
  emacs: () => `why use emacs? try 'vim'`,
  echo: (args: string[]) => args.join(' '),

  sudo: (args: string[]) => {
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    return `Permission denied: unable to run the command '${args[0]}' as root.`;
  },

  theme: (args: string[]) => {
    const usage = `Usage: theme [args].
    [args]:
      ls: list all available themes
      set: set theme to [theme]

    [Examples]:
      theme ls
      theme set gruvboxdark
    `;
    if (args.length === 0) {
      return usage;
    }

    switch (args[0]) {
      case 'ls': {
        let result = themes.map((t) => t.name.toLowerCase()).join(', ');
        result += `You can preview all these themes here: ${packageJson.repository.url}/tree/master/docs/themes`;

        return result;
      }

      case 'set': {
        if (args.length !== 2) {
          return usage;
        }

        const selectedTheme = args[1];
        const t = themes.find((t) => t.name.toLowerCase() === selectedTheme);

        if (!t) {
          return `Theme '${selectedTheme}' not found. Try 'theme ls' to see all available themes.`;
        }

        theme.set(t);
        return `Theme set to ${selectedTheme}`;
      }

      default: {
        return usage;
      }
    }
  },

  repo: () => {
    window.open(packageJson.repository.url, '_blank');
    return 'Opening repository...';
  },

  clear: () => {
    history.set([]);
    return '';
  },

  email: () => {
    window.open(`mailto:${packageJson.author.email}`);
    return `Opening mailto:${packageJson.author.email}...`;
  },

  donate: () => {
    window.open(packageJson.funding.url, '_blank');
    return 'Opening donation url...';
  },

  weather: async (args: string[]) => {
    const city = args.join('+');
    if (!city) {
      return 'Usage: weather [city]. Example: weather Brussels';
    }
    const weather = await fetch(`https://wttr.in/${city}?ATm`);
    return weather.text();
  },

  exit: () => {
    return 'Please close the tab to exit.';
  },

  curl: async (args: string[]) => {
    if (args.length === 0) {
      return 'curl: no URL provided';
    }

    const url = args[0];
    try {
      const response = await fetch(url);
      const data = await response.text();
      return data;
    } catch (error) {
      return `curl: could not fetch URL ${url}. Details: ${error}`;
    }
  },

    banner: () => `
███╗   ███╗██╗  ██╗████████╗████████╗███████╗██████╗
████╗ ████║██║  ██║╚══██╔══╝╚══██╔══╝╚════██║╚════██╗
██╔████╔██║███████║   ██║      ██║       ██╔╝ █████╔╝
██║╚██╔╝██║╚════██║   ██║      ██║      ██╔╝ ██╔═══╝
██║ ╚═╝ ██║     ██║   ██║      ██║      ██║  ███████╗
╚═╝     ╚═╝     ╚═╝   ╚═╝      ╚═╝      ╚═╝  ╚══════╝   v${packageJson.version}

             Terminal Portfolio by SHA

Tape 'help' pour voir la liste des commandes disponibles.
`,
