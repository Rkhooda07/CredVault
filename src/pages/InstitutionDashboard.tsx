import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  Search, 
  Filter, 
  ExternalLink, 
  CheckCircle, 
  Clock, 
  Users,
  Award,
  Building,
  Upload
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface IssuedCredential {
  id: string;
  studentName: string;
  studentWallet: string;
  credentialTitle: string;
  dateIssued: string;
  status: "issued" | "pending" | "revoked";
  transactionHash?: string;
}

export default function InstitutionDashboard() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [issuanceForm, setIssuanceForm] = useState({
    studentWallet: "",
    credentialTitle: "",
    description: "",
    credentialType: "certificate"
  });

  // Mock data
  const issuedCredentials: IssuedCredential[] = [
    {
      id: "1",
      studentName: "Alice Johnson",
      studentWallet: "0x1234...abcd",
      credentialTitle: "Bachelor of Computer Science",
      dateIssued: "2024-05-15",
      status: "issued",
      transactionHash: "0x1234...abcd"
    },
    {
      id: "2",
      studentName: "Bob Smith", 
      studentWallet: "0x5678...efgh",
      credentialTitle: "Master of Data Science",
      dateIssued: "2024-06-20",
      status: "issued",
      transactionHash: "0x5678...efgh"
    },
    {
      id: "3",
      studentName: "Carol Davis",
      studentWallet: "0x9abc...ijkl",
      credentialTitle: "AI/ML Specialization",
      dateIssued: "2024-08-10",
      status: "pending"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "issued":
        return <Badge className="status-verified"><CheckCircle className="w-3 h-3 mr-1" />Issued</Badge>;
      case "pending":
        return <Badge className="status-pending"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case "revoked":
        return <Badge className="status-revoked">Revoked</Badge>;
      default:
        return null;
    }
  };

  const filteredCredentials = issuedCredentials.filter(cred => {
    const matchesSearch = cred.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cred.credentialTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || cred.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleIssueCredential = () => {
    if (!issuanceForm.studentWallet || !issuanceForm.credentialTitle) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Credential Being Issued",
      description: "The credential is being minted on the blockchain. This may take a few minutes.",
    });

    // Reset form
    setIssuanceForm({
      studentWallet: "",
      credentialTitle: "",
      description: "",
      credentialType: "certificate"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Institution Dashboard</h1>
          <p className="text-muted-foreground">Issue and manage blockchain credentials for your students</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="credential-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Issued</p>
                <p className="text-2xl font-bold">{issuedCredentials.length}</p>
              </div>
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="credential-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Students</p>
                <p className="text-2xl font-bold text-success">127</p>
              </div>
              <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-success" />
              </div>
            </div>
          </Card>

          <Card className="credential-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold text-accent">23</p>
              </div>
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-accent" />
              </div>
            </div>
          </Card>

          <Card className="credential-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Institution</p>
                <p className="text-sm font-semibold">Stanford University</p>
              </div>
              <div className="w-12 h-12 bg-primary-glow/20 rounded-full flex items-center justify-center">
                <Building className="w-6 h-6 text-primary-glow" />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Issue Credential Form */}
          <div className="lg:col-span-1">
            <Card className="credential-card p-6">
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <Send className="w-6 h-6 mr-2 text-primary" />
                Issue New Credential
              </h2>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="studentWallet">Student Wallet Address *</Label>
                  <Input
                    id="studentWallet"
                    placeholder="0x..."
                    value={issuanceForm.studentWallet}
                    onChange={(e) => setIssuanceForm(prev => ({ ...prev, studentWallet: e.target.value }))}
                    className="font-mono"
                  />
                </div>

                <div>
                  <Label htmlFor="credentialTitle">Credential Title *</Label>
                  <Input
                    id="credentialTitle"
                    placeholder="e.g., Bachelor of Computer Science"
                    value={issuanceForm.credentialTitle}
                    onChange={(e) => setIssuanceForm(prev => ({ ...prev, credentialTitle: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="credentialType">Credential Type</Label>
                  <select
                    id="credentialType"
                    value={issuanceForm.credentialType}
                    onChange={(e) => setIssuanceForm(prev => ({ ...prev, credentialType: e.target.value }))}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                  >
                    <option value="certificate">Certificate</option>
                    <option value="degree">Degree</option>
                    <option value="diploma">Diploma</option>
                    <option value="award">Award</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Additional details about the credential..."
                    value={issuanceForm.description}
                    onChange={(e) => setIssuanceForm(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div className="space-y-3">
                  <Button 
                    onClick={handleIssueCredential}
                    variant="hero" 
                    className="w-full"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Issue Credential
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Credential File
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Issued Credentials List */}
          <div className="lg:col-span-2">
            <Card className="credential-card p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h2 className="text-2xl font-semibold mb-4 sm:mb-0">Issued Credentials</h2>
                
                <div className="flex gap-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search credentials..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                  >
                    <option value="all">All</option>
                    <option value="issued">Issued</option>
                    <option value="pending">Pending</option>
                    <option value="revoked">Revoked</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {filteredCredentials.map((credential) => (
                  <div 
                    key={credential.id} 
                    className="bg-muted/30 border border-border/50 rounded-lg p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold">{credential.credentialTitle}</h3>
                        <p className="text-sm text-muted-foreground">Student: {credential.studentName}</p>
                        <p className="text-xs font-mono text-muted-foreground mt-1">{credential.studentWallet}</p>
                      </div>
                      {getStatusBadge(credential.status)}
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">
                        Issued: {new Date(credential.dateIssued).toLocaleDateString()}
                      </div>
                      
                      <div className="flex gap-2">
                        {credential.transactionHash && (
                          <Button variant="outline" size="sm">
                            <ExternalLink className="w-4 h-4 mr-1" />
                            View Tx
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                          Revoke
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredCredentials.length === 0 && (
                <div className="text-center py-8">
                  <Award className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">No credentials found</h3>
                  <p className="text-muted-foreground">Start by issuing your first credential.</p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}