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
  - in __Web__ section
    - click Get Started
- in 'Create Distribution' Page
  - in section __"Origin Settings"__
    - Origin Domain Name = __http://catch-the-train.dev-app.space.s3-website-eu-west-1.amazonaws.com__
      - Copy past the exact S3 endpoint (DO NOT select it from the dropbox)
    - Origin Path = _empty_
    - Origin ID = _automatically filled in_
    - Origin Custom Headers = _empty_
  - in section __"Default Cache Behavior Settings"__
    - Viewer Protocol Policy = __Redirect HTTP to HTTPS__
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
    - Compress Objects Automatically = __Yes__
    - Lambda Function Associations = _empty_
  - in section __"Distribution Settings"__
    - Price Class = __Use Only U.S, Canada and Europe
    - AWS WAF Web ACL = _None_
    - Alternate Domain Names (CNAMEs) = __catch-the-train.dev-app.space__ (any custom domain names that you use in addition to the CloudFront domain name)
    - SSL Certificate = __Custom SSL Certificate__
      - Select your certificate in the dropdown (dev-app.space in this case)
    - Custom SSL Client Support = _Clients that Support Server Name Indication (SNI) - (Recommended)_
    - Security Policy = _TLSv1.1_2016 (recommended)_
    - Supported HTTP Versions = _HTTP/2, HTTP/1.1, HTTP/1.0_
    - Default Root Object = __index.html__
    - Logging = _Off_
    - Enable IPv6 = _checked_
    - Comment = __React front-end for 'Catch the train'__
    - Distribution State = _Enable_
  - click Save
- Go to the created distribution
  - Go to Tab 'Error Pages'
  - Click __'Create Custom Error Response'__
  - on 'Create Custom Error Response' Page
    - HTTP Error Code = __403: Forbidden__
    - Error Caching Minimum TTL (seconds) = __86400__
    - Customize Error Response = __Yes__
    - Response Page Path = __/index.html__
    - HTTP Response Code = __200__
    - click __'Create'__
  - Click AGAIN  __'Create Custom Error Response'__
  - on 'Create Custom Error Response' Page
    - HTTP Error Code = __404: Forbidden__
    - Error Caching Minimum TTL (seconds) = __86400__
    - Customize Error Response = __Yes__
    - Response Page Path = __/index.html__
    - HTTP Response Code = __200__
    - click __'Create'__
- [Optional] Go to the created distribution
  - Go to Tab 'Restrictions'
  - click Edit
    - on page 'Edit Geo-Restrictions'
      - Enable Geo-Restriction = __Yes__ (There is no additional charge for configuring geographic restrictions.)
      - Restriction Type = __Whitelist__
      - Countries = Add France
      - click 'Yes Edit'

### Setup the DNS

- Go to Route 53 Console
  - in your hosted zone 'dev-app.space'
  - click 'Create Record Set'
    - Name = __catch-the-train__
    - Type = _A - IPv4 address_
    - Alias = __Yes__
    - Alias Target
      - under __CloudFront __ (and not under S3) you should find and select 'catch-the-train.dev-app.space'
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

thank you
