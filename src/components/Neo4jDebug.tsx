"use client";

import React, { useEffect, useState } from 'react';
import { Database, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

export const Neo4jDebug: React.FC = () => {
  const [envVars, setEnvVars] = useState<{
    uri: boolean;
    username: boolean;
    password: boolean;
    database: boolean;
  }>({
    uri: false,
    username: false,
    password: false,
    database: false,
  });

  useEffect(() => {
    setEnvVars({
      uri: !!process.env.NEXT_PUBLIC_NEO4J_URI,
      username: !!process.env.NEXT_PUBLIC_NEO4J_USERNAME,
      password: !!process.env.NEXT_PUBLIC_NEO4J_PASSWORD,
      database: !!process.env.NEXT_PUBLIC_NEO4J_DATABASE,
    });
  }, []);

  const allSet = Object.values(envVars).every(Boolean);

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Database className="h-5 w-5 text-blue-400" />
        <h3 className="text-sm font-semibold text-white">Neo4j Configuration Status</h3>
      </div>
      
      <div className="space-y-2 text-xs">
        <EnvVarStatus name="NEXT_PUBLIC_NEO4J_URI" isSet={envVars.uri} />
        <EnvVarStatus name="NEXT_PUBLIC_NEO4J_USERNAME" isSet={envVars.username} />
        <EnvVarStatus name="NEXT_PUBLIC_NEO4J_PASSWORD" isSet={envVars.password} />
        <EnvVarStatus name="NEXT_PUBLIC_NEO4J_DATABASE" isSet={envVars.database} />
      </div>

      <div className={`flex items-center gap-2 p-2 rounded ${
        allSet ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
      }`}>
        {allSet ? (
          <>
            <CheckCircle className="h-4 w-4" />
            <span className="text-xs">All Neo4j variables configured</span>
          </>
        ) : (
          <>
            <AlertTriangle className="h-4 w-4" />
            <span className="text-xs">Neo4j not fully configured - graph data will be empty</span>
          </>
        )}
      </div>

      {!allSet && (
        <div className="text-xs text-gray-400 p-2 bg-gray-800 rounded">
          <p className="mb-1">To fix this:</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Create a <code className="bg-gray-700 px-1 rounded">.env.local</code> file in your project root</li>
            <li>Add all 4 Neo4j variables (see ENVIRONMENT_SETUP.md)</li>
            <li>Restart the dev server</li>
          </ol>
        </div>
      )}
    </div>
  );
};

const EnvVarStatus: React.FC<{ name: string; isSet: boolean }> = ({ name, isSet }) => (
  <div className="flex items-center justify-between p-2 bg-gray-800 rounded">
    <span className="text-gray-300 font-mono">{name}</span>
    {isSet ? (
      <CheckCircle className="h-4 w-4 text-green-400" />
    ) : (
      <XCircle className="h-4 w-4 text-red-400" />
    )}
  </div>
);

