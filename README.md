# Ponto Track SAAS

A SaaS Tracking System monorepo

## Local Setup
- On root run `pnpm i`
- On root change .env.example file to .env and change github id and secret to your own (needs to create an application on github to get this)`
- On ./apps/api run `pnpm run db:migrate`
- On ./apps/api run `pnpm run db:seed`
- On root run `pnpm run dev`
- Open localhost:5173/sign-up - Web App login
- Open localhost:3333/docs - Api Docs

## Api Features

### Authentication

- [x] It should be able to authenticate using e-mail & password;
- [x] It should be able to authenticate using Github account;
- [ ] It should be able to recover password using e-mail;
- [x] It should be able to create an account (e-mail, name and password);

### Organizations

- [x] It should be able to create a new organization;
- [x] It should be able to get organizations to which the user belongs;
- [x] It should be able to update an organization;
- [x] It should be able to shutdown an organization;
- [x] It should be able to transfer organization ownership;

### Invites

- [x] It should be able to invite a new member (e-mail, role);
- [x] It should be able to accept an invite;
- [x] It should be able to revoke a pending invite;

### Members

- [x] It should be able to get organization members;
- [x] It should be able to update a member role;

### Vehicles

- [x] It should be able to get vehicles within a organization;
- [x] It should be able to create a new vehicle (name, type, localization, description);
- [x] It should be able to update a vehicle (name, type, localization, description);
- [x] It should be able to delete a vehicle;

### Billing

- [x] It should be able to get billing details for organization ($20 per vehicle / $10 per member excluding billing role);

## RBAC

Roles & permissions.

### Roles

- Owner (count as administrator)
- Administrator
- Member
- Billing (one per organization)
- Anonymous

### Permissions table

|                          | Administrator | Member | Billing | Anonymous |
| ------------------------ | ------------- | ------ | ------- | --------- |
| Update organization      | ✅            | ❌     | ❌      | ❌        |
| Delete organization      | ✅            | ❌     | ❌      | ❌        |
| Invite a member          | ✅            | ❌     | ❌      | ❌        |
| Revoke an invite         | ✅            | ❌     | ❌      | ❌        |
| List members             | ✅            | ✅     | ✅      | ❌        |
| Transfer ownership       | ⚠️            | ❌     | ❌      | ❌        |
| Update member role       | ✅            | ❌     | ❌      | ❌        |
| Delete member            | ✅            | ⚠️     | ❌      | ❌        |
| List vehicles            | ✅            | ✅     | ✅      | ❌        |
| Create a new vehicle     | ✅            | ✅     | ❌      | ❌        |
| Update a vehicle         | ✅            | ⚠️     | ❌      | ❌        |
| Delete a vehicle         | ✅            | ⚠️     | ❌      | ❌        |
| Get billing details      | ✅            | ❌     | ✅      | ❌        |
| Export billing details   | ✅            | ❌     | ✅      | ❌        |

> ✅ = allowed
> ❌ = not allowed
> ⚠️ = allowed w/ conditions
#### Conditions

- Only owners may transfer organization ownership;
- Only administrators and vehicle authors may update/delete the vehicle;
- Members can leave their own organization;