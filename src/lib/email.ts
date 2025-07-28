import nodemailer from 'nodemailer'

// Fungsi untuk memverifikasi environment variables
const verifyEmailConfig = () => {
  const emailUser = process.env.EMAIL_USER
  const emailPass = process.env.EMAIL_PASS
  
  console.log('Email User:', emailUser ? 'Set' : 'Not set')
  console.log('Email Pass:', emailPass ? 'Set' : 'Not set')
  
  if (!emailUser || !emailPass) {
    throw new Error('Email configuration missing. Please set EMAIL_USER and EMAIL_PASS environment variables.')
  }
  
  return { emailUser, emailPass }
}

// Konfigurasi transporter untuk Gmail
const createTransporter = () => {
  const { emailUser, emailPass } = verifyEmailConfig()
  
  // Check if we're in development and using placeholder password
  if (emailPass === 'your_app_password_here' || emailPass.length < 10) {
    console.warn('⚠️  Using placeholder email password. Email will not be sent.')
    console.warn('📧 Please setup Gmail App Password following GMAIL_SETUP.md')
    
    // Return a test transporter for development
    return nodemailer.createTransport({
      streamTransport: true,
      newline: 'unix',
      buffer: true,
    })
  }
  
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPass,
    },
    // Tambahan konfigurasi untuk debugging
    debug: process.env.NODE_ENV === 'development',
    logger: process.env.NODE_ENV === 'development',
  })
}

const transporter = createTransporter()

export interface EmailData {
  name: string
  email: string
  subject: string
  message: string
}

export const sendContactEmail = async (data: EmailData) => {
  const { name, email, subject, message } = data

  // Check if we're in development mode with placeholder password
  const isDevMode = process.env.EMAIL_PASS === 'your_app_password_here' || 
                   (process.env.EMAIL_PASS && process.env.EMAIL_PASS.length < 10)

  if (isDevMode) {
    console.log('📧 DEVELOPMENT MODE - Email simulation')
    console.log('From:', name, '<' + email + '>')
    console.log('Subject:', subject)
    console.log('Message:', message)
    console.log('Would send to: raffayudapratama20@gmail.com')
    
    // Simulate successful email sending
    return { 
      success: true, 
      message: 'Email simulated in development mode. Check console for details.' 
    }
  }

  // Email template untuk notifikasi ke admin
  const adminEmailContent = {
    from: process.env.EMAIL_USER,
    to: 'raffayudapratama20@gmail.com',
    subject: `New Contact Form Submission: ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #007bff; margin-top: 0;">Contact Details</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
        </div>
        
        <div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 5px;">
          <h3 style="color: #333; margin-top: 0;">Message</h3>
          <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background-color: #e9ecef; border-radius: 5px;">
          <p style="margin: 0; font-size: 12px; color: #6c757d;">
            This email was sent from your portfolio contact form at ${new Date().toLocaleString()}.
          </p>
        </div>
      </div>
    `,
  }

  // Email konfirmasi untuk pengirim
  const senderEmailContent = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Thank you for contacting me!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
          Thank You for Your Message!
        </h2>
        
        <p>Hi <strong>${name}</strong>,</p>
        
        <p>Thank you for reaching out through my portfolio contact form. I have received your message and will get back to you as soon as possible.</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #007bff; margin-top: 0;">Your Message Summary</h3>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p style="font-style: italic; white-space: pre-wrap;">${message}</p>
        </div>
        
        <p>I typically respond within 24-48 hours. If your inquiry is urgent, please feel free to reach out to me directly at raffayudapratama20@gmail.com.</p>
        
        <p>Best regards,<br>
        <strong>Raffa Yuda Pratama</strong><br>
        Full Stack Developer</p>
        
        <div style="margin-top: 30px; padding: 15px; background-color: #e9ecef; border-radius: 5px;">
          <p style="margin: 0; font-size: 12px; color: #6c757d;">
            This is an automated confirmation email. Please do not reply to this email.
          </p>
        </div>
      </div>
    `,
  }

  try {
    // Verify transporter configuration
    console.log('Verifying email configuration...')
    await transporter.verify()
    console.log('Email configuration verified successfully')

    // Kirim email ke admin
    console.log('Sending email to admin...')
    const adminResult = await transporter.sendMail(adminEmailContent)
    console.log('Admin email sent successfully:', adminResult.messageId)
    
    // Kirim email konfirmasi ke pengirim
    console.log('Sending confirmation email to sender...')
    const senderResult = await transporter.sendMail(senderEmailContent)
    console.log('Sender confirmation email sent successfully:', senderResult.messageId)
    
    return { success: true }
  } catch (error) {
    console.error('Detailed error sending email:', error)
    
    // Log more specific error information
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    
    // Check if it's an authentication error
    if (error && typeof error === 'object' && 'code' in error) {
      console.error('Error code:', error.code)
      if ('response' in error) {
        console.error('Error response:', (error as any).response)
      }
    }
    
    throw new Error(`Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export default transporter
