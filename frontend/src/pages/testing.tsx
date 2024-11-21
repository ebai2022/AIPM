import React, { useState, useCallback } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Globe, Loader, Download } from "lucide-react";
import Link from "next/link";
import { scrapeWebsite } from "../services/api";

export default function Testing() {
  const [url, setUrl] = useState("");
  const [customRequirements, setCustomRequirements] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResponse("");
    setLoading(true);

    try {
      const suggestions = await scrapeWebsite(url, customRequirements);
      setResponse(suggestions);
    } catch (error: any) {
      setError(
        `Failed to scrape the website. Error: ${error.message || error}`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = useCallback(() => {
    if (!response) return;

    const blob = new Blob([response], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ab_test_suggestions.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [response]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-indigo-600">
              AB Tester
            </Link>
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">
          A/B Testing Automation
        </h1>
        <p className="text-xl text-center mb-12">
          Optimize your website with AI-powered A/B test suggestions.
        </p>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center space-x-2">
              <Globe className="text-gray-400" />
              <Input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter your website URL"
                required
                className="flex-1"
              />
            </div>
            <Textarea
              placeholder="OPTIONAL: Enter any specific requirements or target audience details (e.g., 'We are a luxury brand with more mature clients' or 'I want to target a more Gen Z audience')"
              value={customRequirements}
              onChange={(e) => setCustomRequirements(e.target.value)}
              rows={4}
              className="w-full"
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {loading ? "Analyzing..." : "Get A/B Test Suggestions"}
            </Button>
          </form>

          {error && <p className="mt-4 text-red-600">{error}</p>}
        </div>

        {response && (
          <div className="mt-16 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-2xl font-semibold">
                A/B Test Suggestions Ready!
              </h2>
              <Button
                onClick={handleDownload}
                className="flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download HTML</span>
              </Button>
            </div>
            <div className="p-6">
              <p className="text-gray-600">
                Your A/B test suggestions have been generated. Click the button
                above to download the HTML file containing detailed
                recommendations for optimizing your website.
              </p>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-6 text-center">
          <p>Powered by AI to optimize your website's performance.</p>
          <p className="mt-2">
            &copy; {new Date().getFullYear()} AB Tester. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
