export const countriesQuery = `
  query Countries($language: LanguageCode) @inContext(language: $language) {
    localization {
      availableCountries {
        isoCode
        name
        currency {
          isoCode
        }
      }
    }
  }
`;

export const paymentSettingsQuery = `
  query PaymentSettings {
    shop {
      paymentSettings {
        acceptedCardBrands
        supportedDigitalWallets
      }
    }
  }
`;
