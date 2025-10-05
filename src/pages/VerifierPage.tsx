import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Search, 
  QrCode, 
  CheckCircle, 
  XCircle, 
  ExternalLink, 
  Shield,
  AlertTriangle,
  Calendar,
  Building,
  User
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VerificationResult {
  isValid: boolean;
  credentialTitle?: string;
  studentName?: string;
  issuerName?: string;
  dateIssued?: string;
  transactionHash?: string;
  error?: string;
}

export default function VerifierPage() {
  const { toast } = useToast();
  const [credentialId, setCredentialId] = useState("");
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  // Mock verification function
  const handleVerify = async () => {
    if (!credentialId.trim()) {
      toast({
        title: "Missing Credential ID",
        description: "Please enter a credential ID or hash to verify.",
        variant: "destructive"
      });
      return;
    }

    setIsVerifying(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock verification logic
    const mockResults: { [key: string]: VerificationResult } = {
      "valid123": {
        isValid: true,
        credentialTitle: "Bachelor of Computer Science",
        studentName: "Alice Johnson",
        issuerName: "Stanford University",
        dateIssued: "2024-05-15",
        transactionHash: "0x1234567890abcdef1234567890abcdef12345678"
      },
      "invalid456": {
        isValid: false,
        error: "Credential has been revoked by the issuing institution"
      },
      "notfound789": {
        isValid: false,
        error: "Credential not found on the blockchain"
      }
    };

    const result = mockResults[credentialId] || {
      isValid: true,
      credentialTitle: "AWS Cloud Architect Certification",
      studentName: "John Doe",
      issuerName: "Amazon Web Services",
      dateIssued: "2024-03-10",
      transactionHash: "0xabcdef1234567890abcdef1234567890abcdef12"
    };

    setVerificationResult(result);
    setIsVerifying(false);

    if (result.isValid) {
      toast({
        title: "✅ Credential Verified",
        description: "This credential is valid and verified on the blockchain.",
      });
    } else {
      toast({
        title: "❌ Verification Failed",
        description: result.error || "This credential could not be verified.",
        variant: "destructive"
      });
    }
  };

  const handleScanQR = () => {
    toast({
      title: "QR Scanner",
      description: "QR code scanning functionality would be implemented here.",
    });
  };

  const resetVerification = () => {
    setVerificationResult(null);
    setCredentialId("");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Credential Verifier</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Instantly verify the authenticity of any blockchain-secured credential. 
            Simply enter the credential ID or scan a QR code.
          </p>
        </div>

        {/* Verification Input */}
        <Card className="credential-card p-8 mb-8">
          <div className="space-y-6">
            <div>
              <Label htmlFor="credentialId" className="text-lg font-semibold">
                Credential ID or Transaction Hash
              </Label>
              <div className="mt-2 flex gap-3">
                <Input
                  id="credentialId"
                  placeholder="Enter credential ID or paste transaction hash..."
                  value={credentialId}
                  onChange={(e) => setCredentialId(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !isVerifying && credentialId.trim()) {
                      handleVerify();
                    }
                  }}
                  className="flex-1 font-mono h-12"
                  disabled={isVerifying}
                />
                <Button 
                  onClick={handleScanQR} 
                  variant="outline" 
                  size="lg"
                  className="h-12 px-4"
                  disabled={isVerifying}
                >
                  <QrCode className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={handleVerify} 
                variant="hero" 
                size="lg" 
                className="flex-1 h-12"
                disabled={isVerifying || !credentialId.trim()}
              >
                {isVerifying ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Verify Credential
                  </>
                )}
              </Button>
              
              {verificationResult && (
                <Button onClick={resetVerification} variant="outline" size="lg" className="h-12">
                  New Search
                </Button>
              )}
            </div>

            {/* Quick Demo Links */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-3">Try these demo credentials:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setCredentialId("valid123")}
                  className="text-xs"
                >
                  Valid Credential
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setCredentialId("invalid456")}
                  className="text-xs"
                >
                  Revoked Credential
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setCredentialId("notfound789")}
                  className="text-xs"
                >
                  Not Found
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Verification Result */}
        {verificationResult && (
          <Card className={`credential-card p-8 ${
            verificationResult.isValid ? 'border-success' : 'border-destructive'
          }`}>
            <div className="text-center mb-6">
              {verificationResult.isValid ? (
                <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-success" />
                </div>
              ) : (
                <div className="w-20 h-20 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <XCircle className="w-10 h-10 text-destructive" />
                </div>
              )}
              
              <h2 className={`text-3xl font-bold mb-2 ${
                verificationResult.isValid ? 'text-success' : 'text-destructive'
              }`}>
                {verificationResult.isValid ? '✅ Credential Verified' : '❌ Verification Failed'}
              </h2>
              
              <p className="text-muted-foreground">
                {verificationResult.isValid 
                  ? 'This credential is authentic and verified on the blockchain.'
                  : verificationResult.error || 'This credential could not be verified.'
                }
              </p>
            </div>

            {verificationResult.isValid && (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Credential Title</p>
                      <p className="font-semibold">{verificationResult.credentialTitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Student Name</p>
                      <p className="font-semibold">{verificationResult.studentName}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center">
                      <Building className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Issued By</p>
                      <p className="font-semibold">{verificationResult.issuerName}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-glow/20 rounded-full flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-primary-glow" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date Issued</p>
                      <p className="font-semibold">
                        {verificationResult.dateIssued && new Date(verificationResult.dateIssued).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                {verificationResult.transactionHash && (
                  <div className="md:col-span-2 mt-6 p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Blockchain Transaction</p>
                        <p className="font-mono text-sm break-all">{verificationResult.transactionHash}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View on Polygonscan
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {!verificationResult.isValid && verificationResult.error && (
              <div className="mt-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-destructive mt-0.5" />
                  <div>
                    <p className="font-semibold text-destructive mb-1">Verification Error</p>
                    <p className="text-sm text-destructive/80">{verificationResult.error}</p>
                  </div>
                </div>
              </div>
            )}
          </Card>
        )}

        {/* Info Section */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold mb-4">How Verification Works</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <QrCode className="w-6 h-6 text-primary" />
              </div>
              <p className="font-medium">Scan or Enter</p>
              <p className="text-sm text-muted-foreground">Use QR code or enter credential ID</p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <p className="font-medium">Blockchain Check</p>
              <p className="text-sm text-muted-foreground">Verify against Polygon network</p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <p className="font-medium">Instant Result</p>
              <p className="text-sm text-muted-foreground">Get verification status immediately</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}