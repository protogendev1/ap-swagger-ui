window.onload = function() {
  // Environment detection
  const hostname = window.location.hostname;
  const isGitHubPages = hostname.includes('github.io');
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '';
  
  // Get the repository name and current path
  const pathSegments = window.location.pathname.split('/');
  const repoName = isGitHubPages ? pathSegments[1] : '';
  
  // Determine the correct path to swagger.yaml
  let swaggerYamlPath;
  if (isGitHubPages) {
      swaggerYamlPath = `/${repoName}/swagger.yaml`;
  } else if (isLocalhost) {
      // For local file system, use relative path
      swaggerYamlPath = './swagger.yaml';
  } else {
      swaggerYamlPath = '/swagger.yaml';
  }
  
  // Configure SwaggerUI
  window.ui = SwaggerUIBundle({
      url: swaggerYamlPath,
      dom_id: '#swagger-ui',
      deepLinking: true,
      presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
      ],
      plugins: [
          SwaggerUIBundle.plugins.DownloadUrl
      ],
      layout: "StandaloneLayout",
      supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],
      onComplete: function() {
          console.log(`SwaggerUI loaded with swagger.yaml path: ${swaggerYamlPath}`);
      },
      onFailure: function(error) {
          console.error('Failed to load Swagger UI:', error);
      }
  });
};