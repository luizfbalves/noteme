module.exports = {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy",
    "^@/(.*)$": [
      "<rootDir>/src/$1"
    ]
  },
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest", {
      jsc: { 
        transform: {
          react: {
            runtime: 'automatic'
          }
        }
      }
    }],
  },
  moduleDirectories: [
    "node_modules"
  ],
  transformIgnorePatterns: [
    "!node_modules/"
  ]
}
