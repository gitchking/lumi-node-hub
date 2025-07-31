import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Link as LinkIcon, Tag, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SubmitFormData {
  name: string;
  description: string;
  iconURL: string;
  link: string;
  type: "software" | "plugin" | "script" | "";
}

export const Submit = () => {
  const [formData, setFormData] = useState<SubmitFormData>({
    name: "",
    description: "",
    iconURL: "",
    link: "",
    type: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof SubmitFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.link || !formData.type) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // In a real app, this would submit to Firebase
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Tool submitted!",
        description: "Your tool has been added to the community directory.",
      });
      
      // Reset form
      setFormData({
        name: "",
        description: "",
        iconURL: "",
        link: "",
        type: ""
      });
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "There was an error submitting your tool. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Submit Your <span className="text-primary">Tool</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Share your amazing software, plugin, or script with the community
          </p>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-primary" />
              Tool Information
            </CardTitle>
            <CardDescription>
              Provide details about your tool to help others discover it
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Tool Name *
                </Label>
                <Input
                  id="name"
                  placeholder="e.g., My Awesome Tool"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="h-12"
                  required
                />
              </div>

              {/* Description Field */}
              <div className="space-y-2">
                <Label htmlFor="description" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Description *
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe what your tool does and why it's useful..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="min-h-[100px] resize-none"
                  required
                />
              </div>

              {/* Icon URL Field */}
              <div className="space-y-2">
                <Label htmlFor="iconURL" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Icon URL (optional)
                </Label>
                <Input
                  id="iconURL"
                  placeholder="https://example.com/icon.png"
                  value={formData.iconURL}
                  onChange={(e) => handleInputChange("iconURL", e.target.value)}
                  className="h-12"
                  type="url"
                />
                <p className="text-sm text-muted-foreground">
                  Provide a URL to an icon or logo for your tool
                </p>
              </div>

              {/* Link Field */}
              <div className="space-y-2">
                <Label htmlFor="link" className="flex items-center gap-2">
                  <LinkIcon className="h-4 w-4" />
                  Tool Link *
                </Label>
                <Input
                  id="link"
                  placeholder="https://example.com/my-tool"
                  value={formData.link}
                  onChange={(e) => handleInputChange("link", e.target.value)}
                  className="h-12"
                  type="url"
                  required
                />
              </div>

              {/* Type Field */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Category *
                </Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select tool category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="software">Software</SelectItem>
                    <SelectItem value="plugin">Plugin</SelectItem>
                    <SelectItem value="script">Script</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full h-12"
                  variant="premium"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Tool"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Guidelines */}
        <div className="mt-8 p-6 border border-border rounded-lg bg-card">
          <h3 className="font-semibold text-foreground mb-3">Submission Guidelines</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>• Ensure your tool link is working and accessible</li>
            <li>• Write a clear, concise description explaining your tool's purpose</li>
            <li>• Choose the most appropriate category for your tool</li>
            <li>• Tools should be functional and provide value to the community</li>
          </ul>
        </div>
      </div>
    </div>
  );
};