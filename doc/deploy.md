# Deployment

## Manual procedure

### build the site for production

> npm run build

### Create the S3 bucket

- Go to S3 console
- Create bucket
  - Name = catch-the-train.dev-app.space
  - Region = EU (Ireland) eu-west-1
  - disable all the check boxes under 'Block all public access'
  - check 'I acknowledge that the current settings might result in this bucket and the objects within becoming public.'
- Go to bucket > Properties > Static website hosting
  - select 'Use this bucket to host a website'
  - Index document = index.html
  - Redirection rules (optional) = empty
  - Save
- Go to bucket > Permissions > Static website hosting > bucket Policy

  - Paste

    ```json
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Sid": "PublicReadGetObject",
          "Effect": "Allow",
          "Principal": "*",
          "Action": "s3:GetObject",
          "Resource": "arn:aws:s3:::catch-the-train.dev-app.space/*"
        }
      ]
    }
    ```

  - Save
  - Ignore the warning "This bucket has public access".

- Go to bucket > overview
  - click 'Upload'
  - drag and drop all the content of the build directory.
  - click 'Upload'
- Go to bucket > Properties > Static website hosting
  - Select the 'endpoint' link 'http://catch-the-train.dev-app.space.s3-website-eu-west-1.amazonaws.com'
  - The site should work.

### Create the CDN

- Go to CloudFront Console
  - click 'Create Distribution'
- in 'delivery method for your content' Page
  - in **Web** section
    - click Get Started
- in 'Create Distribution' Page
  - in section **"Origin Settings"**
    - Origin Domain Name = **http://catch-the-train.dev-app.space.s3-website-eu-west-1.amazonaws.com**
      - Copy past the exact S3 endpoint (DO NOT select it from the dropbox)
    - Origin Path = _empty_
    - Origin ID = _automatically filled in_
    - Origin Custom Headers = _empty_
  - in section **"Default Cache Behavior Settings"**
    - Viewer Protocol Policy = **Redirect HTTP to HTTPS**
    - Allowed HTTP Methods = _GET, HEAD_
    - Cache Based on Selected Request Headers = _none_
    - Object Caching = _Use Origin Cache Headers_
    - Minimum TTL = _0_
    - Maximum TTL = _31536000_
    - Default TTL = _86400_ (1 day)
    - Forward Cookies = _None (Improves Caching)_ (Amazon S3 don't process cookies anyway)
    - Query String Forwarding and Caching = _None (Improves Caching)_ (Amazon S3 don't process cookies anyway)
    - Smooth Streaming = _No_
    - Restrict Viewer Access (Use Signed URLs or Signed Cookies) = _No_
    - Compress Objects Automatically = **Yes**
    - Lambda Function Associations = _empty_
  - in section **"Distribution Settings"**
    - Price Class = \_\_Use Only U.S, Canada and Europe
    - AWS WAF Web ACL = _None_
    - Alternate Domain Names (CNAMEs) = **catch-the-train.dev-app.space** (any custom domain names that you use in addition to the CloudFront domain name)
    - SSL Certificate = **Custom SSL Certificate**
      - Select your certificate in the dropdown (dev-app.space in this case)
    - Custom SSL Client Support = _Clients that Support Server Name Indication (SNI) - (Recommended)_
    - Security Policy = _TLSv1.1_2016 (recommended)_
    - Supported HTTP Versions = _HTTP/2, HTTP/1.1, HTTP/1.0_
    - Default Root Object = **index.html**
    - Logging = _Off_
    - Enable IPv6 = _checked_
    - Comment = **React front-end for 'Catch the train'**
    - Distribution State = _Enable_
  - click Save
- Go to the created distribution
  - Go to Tab 'Error Pages'
  - Click **'Create Custom Error Response'**
  - on 'Create Custom Error Response' Page
    - HTTP Error Code = **403: Forbidden**
    - Error Caching Minimum TTL (seconds) = **86400**
    - Customize Error Response = **Yes**
    - Response Page Path = **/index.html**
    - HTTP Response Code = **200**
    - click **'Create'**
  - Click AGAIN **'Create Custom Error Response'**
  - on 'Create Custom Error Response' Page
    - HTTP Error Code = **404: Forbidden**
    - Error Caching Minimum TTL (seconds) = **86400**
    - Customize Error Response = **Yes**
    - Response Page Path = **/index.html**
    - HTTP Response Code = **200**
    - click **'Create'**
- [Optional] Go to the created distribution
  - Go to Tab 'Restrictions'
  - click Edit
    - on page 'Edit Geo-Restrictions'
      - Enable Geo-Restriction = **Yes** (There is no additional charge for configuring geographic restrictions.)
      - Restriction Type = **Whitelist**
      - Countries = Add France
      - click 'Yes Edit'

### Setup the DNS

- Go to Route 53 Console

  - in your hosted zone 'dev-app.space'
  - click 'Create Record Set'
    - Name = **catch-the-train**
    - Type = _A - IPv4 address_
    - Alias = **Yes**
    - Alias Target
      - under **CloudFront ** (and not under S3) you should find and select 'catch-the-train.dev-app.space'
    - for info - the warning 'The distribution should include the Alternate Domain Names (CNAMEs)' is normal (It should have been done)
    - Wait the CloudFront distribution to be is now deployed
    - Click Create

### Test

Wait (some times) that the DNS propagate your changes. Then test...

#### Https should work

- Go to (https://catch-the-train.dev-app.space)[https://catch-the-train.dev-app.space]
- You should be redirected see the page.

#### Http should redirect to https

- Go to (http://catch-the-train.dev-app.space)[http://catch-the-train.dev-app.space]
- You should
  - be redirected to (https://catch-the-train.dev-app.space)[https://catch-the-train.dev-app.space]
  - and see the page.

#### direct access to a client side url should be handled

- Go to (http://catch-the-train.dev-app.space/start)[http://catch-the-train.dev-app.space/start]
- You should
  - be redirected to (https://catch-the-train.dev-app.space/start)[https://catch-the-train.dev-app.space/start]
  - and see the page.

### Optimize cache

- on S3 Console
  - Go to bucket 'catch-the-train.dev-app.space'
  - Select all root files (especially 'index.html') except images.
    - Select Action > Change Meta-data
    - Add the metadata
      - Cache-Control = **no-cache**
    - Click 'Save'
    - Click 'Change'
  - Select directory 'static' and all images files
    - Select Action > Change Meta-data
    - Add the metadata
      - Cache-Control = **public, max-age=31536000**
    - Click 'Save'
    - Click 'Change'
- on CloudFront console
  - Go to the target distribution
  - Go to tab 'Invalidation'
  - click 'create Invalidation'
  - in Popup 'Create invalidation'
    - Object Paths = **\***
    - Click 'Invalidate'
  - Wait for the Invalidation Status to be 'Completed'

### Test the cache

- open the developer tool on Firefox or Chrome
- Go to [https://catch-the-train.dev-app.space/start](https://catch-the-train.dev-app.space/start)
- You should see the page
- on tab 'Network'
  - click on the index document (File /)
    - on the window 'request details'
    - on the tab 'headers'
    - check the response contains 'cache-control: no-cache'
    - check the response DO NOT contains 'age' property
  - click on any chunk file
    - on the window 'request details'
    - on the tab 'headers'
    - check the response contains 'cache-control: public, max-age=31536000'
    - check the response contains 'age' property
