# Recruiters Information

## Image Count Configuration

**Total Recruiter Images Available:** 11

This folder contains recruiter logos numbered from `recruiter1.svg` to `recruiter11.svg`.

## File List
- recruiter1.svg
- recruiter2.svg
- recruiter3.svg
- recruiter4.svg
- recruiter5.svg
- recruiter6.svg
- recruiter7.svg
- recruiter8.svg
- recruiter9.svg
- recruiter10.svg
- recruiter11.svg

## Usage
The RecruitersSection component should load images from `recruiter1.svg` to `recruiter11.svg` to avoid unnecessary HTTP requests for non-existent images.

## Maintenance
When adding or removing recruiter images:
1. Update the image count in this file
2. Update the `RECRUITER_COUNTS` configuration in the RecruitersSection component
3. Ensure images follow the naming convention: `recruiter{number}.svg` 