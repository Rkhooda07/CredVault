import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  Search, 
  Filter, 
  Download, 
  ExternalLink, 
  CheckCircle, 
  Clock, 
  XCircle,
  QrCode,
  Wallet
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Credential {
  id: string;
  title: string;
  issuer: string;
  dateIssued: string;
  status: "verified" | "pending" | "revoked";
  type: string;
  transactionHash?: string;
}

export default function StudentDashboard() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  // Mock data
  const credentials: Credential[] = [
    {
      id: "1",
      title: "Bachelor of Computer Science",
      issuer: "Stanford University",
      dateIssued: "2024-05-15",
      status: "verified",
      type: "Degree",
      transactionHash: "0x1234...abcd"
    },
    {
      id: "2", 
      title: "AWS Cloud Architect Certification",
      issuer: "Amazon Web Services",
      dateIssued: "2024-03-10",
      status: "verified",
      type: "Certificate",
      transactionHash: "0x5678...efgh"
    },
    {
      id: "3",
      title: "Data Science Bootcamp",
      issuer: "DataCamp",
      dateIssued: "2024-08-20",
      status: "pending",
      type: "Certificate"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="status-verified"><CheckCircle className="w-3 h-3 mr-1" />Verified</Badge>;
      case "pending":
        return <Badge className="status-pending"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case "revoked":
        return <Badge className="status-revoked"><XCircle className="w-3 h-3 mr-1" />Revoked</Badge>;
      default:
        return null;
    }
  };

  const filteredCredentials = credentials.filter(cred => {
    const matchesSearch = searchTerm === "" || 
                         cred.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cred.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cred.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || cred.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleUpload = () => {
    toast({
      title: "Upload Started",
      description: "Your credential is being processed and will be verified on the blockchain.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Credentials</h1>
          <p className="text-muted-foreground">Manage and verify your blockchain-secured academic credentials</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="credential-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Credentials</p>
                <p className="text-2xl font-bold">{credentials.length}</p>
              </div>
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="credential-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Verified</p>
                <p className="text-2xl font-bold text-success">
                  {credentials.filter(c => c.status === "verified").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
            </div>
          </Card>

          <Card className="credential-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-accent">
                  {credentials.filter(c => c.status === "pending").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-accent" />
              </div>
            </div>
          </Card>

          <Card className="credential-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Wallet</p>
                <p className="text-sm font-mono">0x1234...abcd</p>
              </div>
              <div className="w-12 h-12 bg-primary-glow/20 rounded-full flex items-center justify-center">
                <Wallet className="w-6 h-6 text-primary-glow" />
              </div>
            </div>
          </Card>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search credentials by title or issuer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="min-w-[140px] px-4 py-2 h-11 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">All Status</option>
                <option value="verified">Verified</option>
                <option value="pending">Pending</option>
                <option value="revoked">Revoked</option>
              </select>
              <Button onClick={handleUpload} variant="hero" className="h-11 px-6">
                <Upload className="w-4 h-4 mr-2" />
                Upload Credential
              </Button>
            </div>
          </div>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCredentials.map((credential) => (
            <Card key={credential.id} className="credential-card p-6 hover:scale-105 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{credential.title}</h3>
                  <p className="text-muted-foreground text-sm">{credential.issuer}</p>
                </div>
                {getStatusBadge(credential.status)}
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Type:</span>
                  <span>{credential.type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Issued:</span>
                  <span>{new Date(credential.dateIssued).toLocaleDateString()}</span>
                </div>
                {credential.transactionHash && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tx Hash:</span>
                    <span className="font-mono text-xs">{credential.transactionHash}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" size="sm" className="flex-1 min-w-0">
                  <QrCode className="w-4 h-4 mr-2" />
                  QR Code
                </Button>
                <Button variant="outline" size="sm" className="flex-1 min-w-0">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                {credential.transactionHash && (
                  <Button variant="ghost" size="sm" className="sm:flex-none">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        {filteredCredentials.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No credentials found</h3>
            <p className="text-muted-foreground">Try adjusting your search or upload your first credential.</p>
          </div>
        )}
      </div>
    </div>
  );
}