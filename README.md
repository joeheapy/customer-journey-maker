# Customer Journey Pain Points Generator

A Next.js application that generates customer journey steps and associated pain points using OpenAI's GPT-4.

## Features

- 🛣️ Customer Journey Generation
- 🎯 Customer Pain Points Analysis
- 💼 Business Pain Points Analysis
- 💳 Token System Management
- 📊 CSV Export
- 🎨 Responsive UI with Tailwind CSS

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- OpenAI API (GPT-4)
- Tailwind CSS
- Vercel Deployment

## Prerequisites

- Node.js 18+
- OpenAI API key
- npm or yarn

## Usage

- Start with generating a customer journey
- Generate customer pain points for each step
- Generate business pain points for each step
- Export results to CSV

## API Routes

- /api/openai/customer-journey
- /api/openai/customer-pains
- /api/openai/business-pains

## Deployment

Configured for Vercel deployment with:

- Function timeout: 60 seconds
- Dynamic API routes
- TypeScript support

# Contributing Guide

## File Structure

`src/lib/types.ts` - Central type definitions and constants
`src/components/*` - React components
`src/app/*` - Next.js App Router pages
`src/utils/*` - Utility functions and hooks

## Code Style

- Use TypeScript strict mode
- Export constants with UPPERCASE
- Use interfaces over types
- Document complex type definitions
