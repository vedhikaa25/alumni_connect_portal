import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialShare = ({ event }) => {
  const [copied, setCopied] = useState(false);

  const shareUrl = window.location?.href;
  const shareText = `Join me at ${event?.title} - ${event?.date}`;

  const socialPlatforms = [
    {
      name: 'Facebook',
      icon: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: 'text-blue-600 hover:bg-blue-50'
    },
    {
      name: 'Twitter',
      icon: 'Twitter',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      color: 'text-sky-500 hover:bg-sky-50'
    },
    {
      name: 'LinkedIn',
      icon: 'Linkedin',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      color: 'text-blue-700 hover:bg-blue-50'
    },
    {
      name: 'WhatsApp',
      icon: 'MessageCircle',
      url: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
      color: 'text-green-600 hover:bg-green-50'
    }
  ];

  const handleShare = (platform) => {
    window.open(platform?.url, '_blank', 'width=600,height=400');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard?.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-soft p-6">
      <h2 className="font-heading font-bold text-heading-md text-foreground mb-4">
        Share This Event
      </h2>
      <p className="font-body text-body-sm text-muted-foreground mb-6">
        Help spread the word about this event to your network
      </p>
      {/* Social Media Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {socialPlatforms?.map((platform) => (
          <button
            key={platform?.name}
            onClick={() => handleShare(platform)}
            className={`flex flex-col items-center space-y-2 p-4 rounded-lg border border-border transition-all duration-200 ${platform?.color}`}
          >
            <Icon name={platform?.icon} size={24} />
            <span className="font-body text-caption font-medium">
              {platform?.name}
            </span>
          </button>
        ))}
      </div>
      {/* Copy Link */}
      <div className="space-y-3">
        <label className="font-body font-medium text-body-sm text-foreground">
          Event Link
        </label>
        <div className="flex items-center space-x-2">
          <div className="flex-1 px-3 py-2 bg-muted rounded-lg border border-border">
            <span className="font-body text-body-sm text-muted-foreground truncate block">
              {shareUrl}
            </span>
          </div>
          <Button
            variant={copied ? "success" : "outline"}
            size="sm"
            iconName={copied ? "Check" : "Copy"}
            onClick={handleCopyLink}
          >
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </div>
      </div>
      {/* Email Share */}
      <div className="mt-6 pt-6 border-t border-border">
        <Button
          variant="outline"
          fullWidth
          iconName="Mail"
          iconPosition="left"
          onClick={() => {
            const subject = encodeURIComponent(`Invitation: ${event?.title}`);
            const body = encodeURIComponent(`Hi,\n\nI'd like to invite you to join me at this event:\n\n${event?.title}\nDate: ${event?.date}\nTime: ${event?.startTime} - ${event?.endTime}\nLocation: ${event?.location}\n\nLearn more and RSVP: ${shareUrl}\n\nHope to see you there!`);
            window.location.href = `mailto:?subject=${subject}&body=${body}`;
          }}
        >
          Share via Email
        </Button>
      </div>
    </div>
  );
};

export default SocialShare;