// Utilisation de l'API fetch native de Node.js 18+

interface MailchimpSubscriber {
  email: string;
  firstName: string;
  lastName: string;
  interests?: string[];
  source?: string;
}

interface MailchimpCampaign {
  subject: string;
  content: string;
  listId: string;
}

class MailchimpService {
  private apiKey: string;
  private serverPrefix: string = '';
  private baseUrl: string = '';

  constructor() {
    this.apiKey = process.env.MAILCHIMP_API_KEY || '';
    
    if (!this.apiKey) {
      console.warn('⚠️ MAILCHIMP_API_KEY non configurée - Mode simulation activé');
      return;
    }

    // Extraire le préfixe serveur de la clé API (ex: us1, us2, etc.)
    this.serverPrefix = this.apiKey.split('-')[1];
    this.baseUrl = `https://${this.serverPrefix}.api.mailchimp.com/3.0`;
  }

  private getHeaders() {
    return {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json'
    };
  }

  // Ajouter un abonné à la liste Mailchimp
  async addSubscriber(subscriber: MailchimpSubscriber, listId: string): Promise<{ success: boolean; error?: string }> {
    if (!this.apiKey) {
      console.log(`📧 SIMULATION Mailchimp - Ajout abonné : ${subscriber.email}`);
      return { success: true };
    }

    try {
      const memberData = {
        email_address: subscriber.email,
        status: 'subscribed',
        merge_fields: {
          FNAME: subscriber.firstName,
          LNAME: subscriber.lastName
        },
        tags: subscriber.interests || [],
        source: subscriber.source || 'website'
      };

      const response = await fetch(`${this.baseUrl}/lists/${listId}/members`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(memberData)
      });

      if (response.ok) {
        console.log(`✅ Abonné ajouté à Mailchimp : ${subscriber.email}`);
        return { success: true };
      } else {
        const error = await response.text();
        console.error(`❌ Erreur Mailchimp : ${error}`);
        return { success: false, error: error };
      }

    } catch (error) {
      console.error('❌ Erreur connexion Mailchimp :', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Supprimer/désabonner un membre
  async unsubscribeSubscriber(email: string, listId: string): Promise<{ success: boolean; error?: string }> {
    if (!this.apiKey) {
      console.log(`📧 SIMULATION Mailchimp - Désabonnement : ${email}`);
      return { success: true };
    }

    try {
      // Hash MD5 de l'email pour l'API Mailchimp
      const crypto = await import('crypto');
      const emailHash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');

      const response = await fetch(`${this.baseUrl}/lists/${listId}/members/${emailHash}`, {
        method: 'PATCH',
        headers: this.getHeaders(),
        body: JSON.stringify({ status: 'unsubscribed' })
      });

      if (response.ok) {
        console.log(`✅ Désabonnement Mailchimp : ${email}`);
        return { success: true };
      } else {
        const error = await response.text();
        return { success: false, error };
      }

    } catch (error) {
      console.error('❌ Erreur désabonnement Mailchimp :', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Créer et envoyer une campagne
  async createAndSendCampaign(campaign: MailchimpCampaign): Promise<{ success: boolean; campaignId?: string; error?: string }> {
    if (!this.apiKey) {
      console.log(`📧 SIMULATION Mailchimp - Envoi campagne : "${campaign.subject}"`);
      console.log(`Contenu : ${campaign.content.substring(0, 100)}...`);
      return { success: true, campaignId: 'simulation-campaign-123' };
    }

    try {
      // 1. Créer la campagne
      const campaignData = {
        type: 'regular',
        recipients: {
          list_id: campaign.listId
        },
        settings: {
          subject_line: campaign.subject,
          title: `Newsletter - ${campaign.subject}`,
          from_name: 'Weblify Studio',
          reply_to: 'contact@weblifystudio.fr',
          preview_text: 'Découvrez nos dernières actualités et conseils web'
        }
      };

      const createResponse = await fetch(`${this.baseUrl}/campaigns`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(campaignData)
      });

      if (!createResponse.ok) {
        const error = await createResponse.text();
        return { success: false, error: `Erreur création campagne: ${error}` };
      }

      const campaignResult = await createResponse.json();
      const campaignId = campaignResult.id;

      // 2. Ajouter le contenu
      const contentData = {
        html: this.formatNewsletterHTML(campaign.content)
      };

      const contentResponse = await fetch(`${this.baseUrl}/campaigns/${campaignId}/content`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify(contentData)
      });

      if (!contentResponse.ok) {
        const error = await contentResponse.text();
        return { success: false, error: `Erreur ajout contenu: ${error}` };
      }

      // 3. Envoyer la campagne
      const sendResponse = await fetch(`${this.baseUrl}/campaigns/${campaignId}/actions/send`, {
        method: 'POST',
        headers: this.getHeaders()
      });

      if (sendResponse.ok) {
        console.log(`✅ Campagne Mailchimp envoyée : ${campaignId}`);
        return { success: true, campaignId };
      } else {
        const error = await sendResponse.text();
        return { success: false, error: `Erreur envoi: ${error}` };
      }

    } catch (error) {
      console.error('❌ Erreur campagne Mailchimp :', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Obtenir les statistiques de la liste
  async getListStats(listId: string): Promise<{ success: boolean; stats?: any; error?: string }> {
    if (!this.apiKey) {
      return {
        success: true,
        stats: {
          member_count: 0,
          unsubscribe_count: 0,
          cleaned_count: 0,
          member_count_since_send: 0
        }
      };
    }

    try {
      const response = await fetch(`${this.baseUrl}/lists/${listId}`, {
        method: 'GET',
        headers: this.getHeaders()
      });

      if (response.ok) {
        const data = await response.json();
        return {
          success: true,
          stats: {
            member_count: data.stats.member_count,
            unsubscribe_count: data.stats.unsubscribe_count,
            cleaned_count: data.stats.cleaned_count,
            member_count_since_send: data.stats.member_count_since_send
          }
        };
      } else {
        const error = await response.text();
        return { success: false, error };
      }

    } catch (error) {
      console.error('❌ Erreur stats Mailchimp :', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Template HTML pour Mailchimp
  private formatNewsletterHTML(content: string): string {
    const formattedContent = content.replace(/\n/g, '<br>');
    
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Newsletter - Weblify Studio</title>
        <style>
          body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 14px; color: #6c757d; }
          .unsubscribe { font-size: 12px; color: #999; margin-top: 20px; }
          .unsubscribe a { color: #999; text-decoration: underline; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📧 Newsletter Weblify Studio</h1>
            <p>Votre dose mensuelle d'inspiration web</p>
          </div>
          
          <div class="content">
            ${formattedContent}
          </div>
          
          <div class="footer">
            <p><strong>Weblify Studio</strong> - Votre agence web de confiance</p>
            <p>Paris, France | contact@weblifystudio.fr</p>
            
            <div class="unsubscribe">
              <p>Vous recevez cet email car vous êtes abonné(e) à notre newsletter.</p>
              <p><a href="*|UNSUB|*">Se désabonner</a> | <a href="*|UPDATE_PROFILE|*">Mettre à jour vos préférences</a></p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

export const mailchimpService = new MailchimpService();