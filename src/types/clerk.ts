export type ClerkUser = {
  id: "string";
  object: "user";
  external_id: "string";
  primary_email_address_id: "string";
  primary_phone_number_id: "string";
  primary_web3_wallet_id: "string";
  username: "string";
  first_name: "string";
  last_name: "string";
  profile_image_url: "string";
  image_url: "string";
  has_image: true;
  public_metadata: {};
  private_metadata: {};
  unsafe_metadata: {};
  email_addresses: [
    {
      id: "string";
      object: "email_address";
      email_address: "string";
      reserved: true;
      verification: {
        status: "unverified";
        strategy: "phone_code";
        attempts: 0;
        expire_at: 0;
      };
      linked_to: [
        {
          type: "oauth_google";
          id: "string";
        },
      ];
      created_at: 0;
      updated_at: 0;
    },
  ];
  phone_numbers: [
    {
      id: "string";
      object: "phone_number";
      phone_number: "string";
      reserved_for_second_factor: true;
      default_second_factor: true;
      reserved: true;
      verification: {
        status: "unverified";
        strategy: "phone_code";
        attempts: 0;
        expire_at: 0;
      };
      linked_to: [
        {
          type: "oauth_google";
          id: "string";
        },
      ];
      backup_codes: ["string"];
      created_at: 0;
      updated_at: 0;
    },
  ];
  web3_wallets: [
    {
      id: "string";
      object: "web3_wallet";
      web3_wallet: "string";
      verification: {
        status: "verified";
        strategy: "web3_metamask_signature";
        nonce: "nonce";
        attempts: 0;
        expire_at: 0;
      };
      created_at: 0;
      updated_at: 0;
    },
  ];
  passkeys: [
    {
      id: "string";
      object: "passkey";
      name: "string";
      last_used_at: 0;
      verification: {
        status: "verified";
        strategy: "passkey";
        nonce: "nonce";
        attempts: 0;
        expire_at: 0;
      };
    },
  ];
  password_enabled: true;
  two_factor_enabled: true;
  totp_enabled: true;
  backup_code_enabled: true;
  mfa_enabled_at: 0;
  mfa_disabled_at: 0;
  external_accounts: [{}];
  saml_accounts: [
    {
      id: "string";
      object: "saml_account";
      provider: "string";
      active: true;
      email_address: "string";
      first_name: "string";
      last_name: "string";
      provider_user_id: "string";
      public_metadata: {};
      verification: {
        status: "unverified";
        strategy: "saml";
        external_verification_redirect_url: "string";
        error: {
          message: "string";
          long_message: "string";
          code: "string";
          meta: {};
          clerk_trace_id: "string";
        };
        expire_at: 0;
        attempts: 0;
      };
    },
  ];
  last_sign_in_at: 0;
  banned: true;
  locked: true;
  lockout_expires_in_seconds: 0;
  verification_attempts_remaining: 0;
  updated_at: 0;
  created_at: 0;
  delete_self_enabled: true;
  create_organization_enabled: true;
  create_organizations_limit: 0;
  last_active_at: 1700690400000;
};
