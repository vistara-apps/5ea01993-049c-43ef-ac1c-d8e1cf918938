# FairChain Draws

Transparent, Blockchain-Verified Draws with Seamless Prize Fulfillment.

## Features

- **Blockchain-Verified RNG**: On-chain verifiable random number generation for transparent winner selection
- **Secure Prize Handling**: Automated distribution of cryptocurrency prizes and NFTs with KYC/AML compliance
- **Physical Prize Fulfillment**: Integrated supply chain management for physical prizes
- **Farcaster Integration**: Native Frame experiences for social-first draw participation
- **Multi-Theme Support**: Professional finance theme with support for Celo, Solana, Base, and Coinbase themes

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base Network with OnchainKit integration
- **Styling**: Tailwind CSS with custom design system
- **TypeScript**: Full type safety throughout the application
- **Components**: Modular, reusable component architecture

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

```
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key
```

## Theme Support

The app supports multiple blockchain themes:
- **Finance (Default)**: Professional dark navy with gold accents
- **Celo**: Black background with yellow accents
- **Solana**: Dark purple with magenta accents  
- **Base**: Dark blue with Base blue accents
- **Coinbase**: Dark navy with Coinbase blue accents

Visit `/theme-preview` to see all themes in action.

## Architecture

### Core Components

- **AppShell**: Main application layout with navigation
- **DrawCard**: Display draw information and participation options
- **PrizeDisplay**: Show prize details with type-specific styling
- **ActionForm**: Handle user interactions for draw entry and prize claims
- **ProgressTracker**: Visualize draw progress and fulfillment status

### Data Models

- **Draw**: Core draw entity with blockchain verification
- **Prize**: Physical and digital prize management
- **Participant**: User participation tracking
- **Organizer**: Draw creator management
- **Supplier**: Prize supplier integration

## License

MIT License - see LICENSE file for details.
