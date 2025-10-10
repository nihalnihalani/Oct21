import React from 'react';
import Layout from './components/layout/Layout';
import { AuroraText } from './components/typography/AuroraText';
import { RainbowButton } from './components/buttons/RainbowButton';
import { Card } from './components/cards/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/inputs/Tabs';
import { Input } from './components/inputs/Input';
import { Sparkles, Link2, FileEdit } from 'lucide-react';

export default function Example() {
  return (
    <Layout>
      {/* Header */}
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
            <AuroraText
              colors={["#ffffff", "#f3f4f6", "#e5e7eb", "#d1d5db"]}
              speed={1.2}
            >
              OneClick
            </AuroraText>
          </h1>
        </div>
        <p className="text-gray-200 text-lg font-medium">
          Create professional content with{" "}
          <span className="text-yellow-400">Agent AI</span>
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        <Card className="p-6 bg-gray-900/80 backdrop-blur-sm border-gray-700">
          <Tabs defaultValue="url" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="url" className="flex items-center gap-2">
                <Link2 className="h-4 w-4" />
                Product URL
              </TabsTrigger>
              <TabsTrigger value="manual" className="flex items-center gap-2">
                <FileEdit className="h-4 w-4" />
                Manual Entry
              </TabsTrigger>
            </TabsList>

            <TabsContent value="url" className="space-y-4">
              <p className="text-sm text-gray-400 mb-4">
                Enter a product URL to automatically generate content
              </p>
              <div className="space-y-4">
                <Input
                  type="url"
                  placeholder="https://example.com/product"
                  className="h-12 input-transparent"
                />
                <RainbowButton>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Generate Content
                  </div>
                </RainbowButton>
              </div>
            </TabsContent>

            <TabsContent value="manual" className="space-y-4">
              <p className="text-sm text-gray-400 mb-4">
                Manually enter product information
              </p>
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Product Name"
                  className="h-12 input-transparent"
                />
                <Input
                  type="text"
                  placeholder="Product Description"
                  className="h-12 input-transparent"
                />
                <RainbowButton>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Generate Content
                  </div>
                </RainbowButton>
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-400">
          <p>Powered by AI • Premium Template</p>
        </div>
      </div>
    </Layout>
  );
}
