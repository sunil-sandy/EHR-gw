# Step-by-Step Guide to Host Your Hospital Management System on Hostinger

This guide will walk you through the process of hosting both your Next.js frontend and Django backend on Hostinger.

## Prerequisites

- A Hostinger account
- Your Hospital Management System codebase (Next.js frontend and Django backend)
- Domain name (can be purchased through Hostinger)
- Basic knowledge of command line and Git

## Part 1: Setting Up Your Hostinger Account

### 1. Purchase a Hosting Plan

1. Go to [Hostinger's website](https://www.hostinger.com/)
2. Choose a Premium or Business hosting plan that supports Node.js and Python
3. Complete the purchase process
4. Set up or connect your domain name

### 2. Access Your Hosting Control Panel

1. Log in to your Hostinger account
2. Navigate to the hPanel (Hostinger's control panel)

## Part 2: Setting Up the Django Backend

### 1. Create a Python Environment

1. In hPanel, go to "Website" > "Python"
2. Click "Create a New Python App"
3. Choose Python 3.9+ as the version
4. Set the application path (e.g., `api.yourdomain.com` or `yourdomain.com/api`)
5. Click "Create"

### 2. Upload Your Django Project

#### Option A: Using FTP

1. In hPanel, go to "Files" > "File Manager" or use an FTP client like FileZilla
2. Navigate to the Python app directory created in the previous step
3. Upload your Django project files

#### Option B: Using Git (Recommended)

1. In hPanel, go to "Website" > "Git"
2. Click "Create a New Repository"
3. Configure the repository settings
4. Clone your Django repository:
   \`\`\`bash
   git clone https://github.com/yourusername/your-django-repo.git
   \`\`\`

### 3. Set Up the Virtual Environment and Install Dependencies

1. Access SSH through hPanel (or use the Terminal feature)
2. Navigate to your Django project directory
3. Create and activate a virtual environment:
   \`\`\`bash
   python -m venv venv
   source venv/bin/activate
   \`\`\`
4. Install dependencies:
   \`\`\`bash
   pip install -r requirements.txt
   \`\`\`

### 4. Configure Django Settings

1. Update your Django settings for production:
   ```python
   # settings.py
   DEBUG = False
   ALLOWED_HOSTS = ['yourdomain.com', 'api.yourdomain.com']
   
   # Configure database
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.mysql',
           'NAME': 'your_db_name',
           'USER': 'your_db_user',
           'PASSWORD': 'your_db_password',
           'HOST': 'localhost',
           'PORT': '3306',
       }
   }
   
   # Configure CORS
   CORS_ALLOWED_ORIGINS = [
       'https://yourdomain.com',
   ]
   \`\`\`

### 5. Set Up the Database

1. In hPanel, go to "Databases" > "MySQL Databases"
2. Create a new database and user
3. Note down the credentials for your Django settings

### 6. Run Migrations and Create Superuser

1. In the SSH terminal, run:
   \`\`\`bash
   python manage.py migrate
   python manage.py createsuperuser
   \`\`\`

### 7. Configure WSGI

1. Create or update your `wsgi.py` file:
   ```python
   import os
   from django.core.wsgi import get_wsgi_application
   
   os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'your_project.settings')
   
   application = get_wsgi_application()
   \`\`\`

### 8. Set Up Static Files

1. Configure static files in your Django settings:
   ```python
   STATIC_URL = '/static/'
   STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
   MEDIA_URL = '/media/'
   MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
   \`\`\`
2. Collect static files:
   \`\`\`bash
   python manage.py collectstatic
   \`\`\`

### 9. Configure the Python App in hPanel

1. In hPanel, go to "Website" > "Python"
2. Select your Python app
3. Set the WSGI Application Path to point to your wsgi.py file
4. Set the Application URL to your domain or subdomain
5. Save changes

## Part 3: Setting Up the Next.js Frontend

### 1. Create a Node.js Environment

1. In hPanel, go to "Website" > "Node.js"
2. Click "Create a New Node.js App"
3. Choose Node.js 18.x or higher
4. Set the application path to your main domain (e.g., `yourdomain.com`)
5. Click "Create"

### 2. Upload Your Next.js Project

#### Option A: Using FTP

1. In hPanel, go to "Files" > "File Manager" or use an FTP client
2. Navigate to the Node.js app directory
3. Upload your Next.js project files

#### Option B: Using Git (Recommended)

1. In hPanel, go to "Website" > "Git"
2. Click "Create a New Repository" (if not already created)
3. Configure the repository settings
4. Clone your Next.js repository:
   \`\`\`bash
   git clone https://github.com/yourusername/your-nextjs-repo.git
   \`\`\`

### 3. Configure Environment Variables

1. In hPanel, go to "Website" > "Node.js"
2. Select your Node.js app
3. Add the following environment variables:
   - `NODE_ENV=production`
   - `NEXT_PUBLIC_API_URL=https://api.yourdomain.com` (or your API endpoint)
   - Any other environment variables your app needs

### 4. Install Dependencies and Build the App

1. Access SSH through hPanel
2. Navigate to your Next.js project directory
3. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
4. Build the app:
   \`\`\`bash
   npm run build
   \`\`\`

### 5. Configure the Start Command

1. In hPanel, go to "Website" > "Node.js"
2. Select your Node.js app
3. Set the Start Command to:
   \`\`\`bash
   npm start
   \`\`\`
4. Save changes

### 6. Set Up Custom Domain (if using a subdomain for frontend)

1. In hPanel, go to "Domains" > "Subdomains"
2. Create a subdomain if needed
3. Point it to your Node.js app directory

## Part 4: Setting Up SSL Certificates

### 1. Install SSL Certificate

1. In hPanel, go to "SSL/TLS"
2. Select your domain
3. Click "Install" on the Let's Encrypt Free SSL option
4. Follow the instructions to complete the installation

### 2. Force HTTPS Redirection

1. In hPanel, go to "Website" > "SSL/TLS"
2. Enable "Force HTTPS" option

## Part 5: Final Configuration

### 1. Set Up Domain DNS

1. In hPanel, go to "Domains" > "DNS Zone Editor"
2. Ensure your domain and subdomains have the correct A records pointing to your Hostinger server IP

### 2. Test Your Application

1. Visit your domain in a web browser
2. Test all functionality to ensure everything works correctly
3. Check that the frontend can communicate with the backend API

### 3. Set Up Regular Backups

1. In hPanel, go to "Website" > "Backups"
2. Configure automatic backups for your website and database
3. Set a regular schedule (daily or weekly recommended)
4. Test the backup and restore functionality

### 4. Monitor Performance

1. In hPanel, go to "Website" > "Statistics"
2. Monitor your website's performance and resource usage
3. Set up email notifications for any critical issues
4. Consider using additional monitoring tools like New Relic or Datadog for more detailed insights

## Part 6: Troubleshooting Common Issues

### 1. 502 Bad Gateway or 504 Gateway Timeout

This usually indicates an issue with your Node.js or Python application:

1. Check the application logs in hPanel
2. Ensure your start command is correct
3. Verify that your application is listening on the correct port
4. Check for memory issues or crashes

### 2. CORS Errors

If your frontend can't communicate with your backend:

1. Verify your Django CORS settings
2. Ensure the API URL in your frontend is correct
3. Check that your SSL certificates are valid for both domains

### 3. Database Connection Issues

If your application can't connect to the database:

1. Verify database credentials in your Django settings
2. Check database server status in hPanel
3. Ensure your database user has the correct permissions

### 4. Static Files Not Loading

If CSS, JavaScript, or images aren't loading:

1. Check your Django static files configuration
2. Verify that `collectstatic` was run successfully
3. Check file permissions on your static directories

## Part 7: Maintenance and Updates

### 1. Updating Your Application

1. Pull the latest code from your Git repository
2. Install any new dependencies
3. Run migrations if needed
4. Rebuild your Next.js application
5. Restart your Node.js and Python applications

### 2. Security Updates

1. Regularly update your Django and Next.js dependencies
2. Keep your Node.js and Python versions up to date
3. Monitor security advisories for any packages you use
4. Implement security best practices like rate limiting and input validation

### 3. Performance Optimization

1. Enable caching for your Django API
2. Optimize database queries
3. Use CDN for static assets
4. Implement server-side caching for frequently accessed data

## Conclusion

By following this guide, you should have successfully deployed your Hospital Management System on Hostinger with both the Next.js frontend and Django backend working together seamlessly. Remember to regularly monitor your application, perform backups, and keep your dependencies updated for optimal performance and security.

If you encounter any specific issues not covered in this guide, Hostinger's support team is available to help, or you can consult the official documentation for Next.js and Django for more detailed troubleshooting steps.
