import type { FullStackTrack } from "../fullstackTrackTypes";

export const cloudTrack: FullStackTrack = {
  layoutTitle: "Cloud Architecture, Serverless & IaC",
  layoutSubtitle: "AWS S3 Pre-Signed URLs, Lambda Serverless, VPC/IAM Security, and Terraform",
  accent: "orange",
  defaultSectionId: "aws-serverless",
  sections: [
    {
      id: "aws-serverless",
      title: "AWS & Serverless",
      icon: "☁️",
      heroTitle: "☁️ Object Storage, Serverless & Networking",
      heroSubtitle: "Direct S3 uploads, Lambda cold starts, VPC subnets, and IAM security",
      heroGradient: "from-amber-600 via-orange-600 to-rose-700",
      concepts: [
        {
          id: "1",
          number: 1,
          title: "AWS S3 & Pre-Signed URLs",
          priority: "🔥",
          theory: {
            what: "Amazon S3 (Simple Storage Service) is an object store with 99.999999999% (11 9s) durability. A Pre-Signed URL gives temporary, cryptographically signed permission (15-minute TTL) for clients to upload (PUT) or download (GET) objects directly to/from S3 without exposing AWS secret keys.",
            why: "Proxying large file uploads (video, images, PDFs) through application servers exhausts Node.js/Java worker memory and network bandwidth. Pre-signed URLs offload 100% of data transfer directly to AWS infrastructure.",
            how: "1. Client requests upload URL: POST /api/upload-url. 2. Backend verifies auth and generates signed PUT URL using @aws-sdk/s3-request-presigner. 3. Client uploads file directly to S3 via HTTP PUT. 4. S3 fires an event trigger (S3 Event Notification -> SQS/Lambda) to process the uploaded file.",
            keyPoints: [
              "Never upload files to local server disk in containerized environments (ephemeral filesystem)",
              "Multipart Pre-Signed Upload: Used for files >100MB with resumable chunk uploads",
              "S3 Storage Classes: Standard -> Infrequent Access (IA) -> Glacier Instant -> Glacier Deep Archive for cost lifecycle policies",
            ],
            interviewQuestions: [
              {
                question: "Why should clients upload files directly to S3 using Pre-Signed URLs instead of uploading to your backend API server?",
                answer: "Uploading large files to an API server ties up server threads, saturates network bandwidth, and consumes heap memory for buffer processing. Pre-signed URLs let the client stream bytes directly to Amazon S3's globally distributed storage endpoints, keeping the application servers completely stateless and lightweight.",
              },
            ],
          },
          codeExample: {
            title: "Generate S3 Pre-Signed PUT URL with AWS SDK v3",
            code: `import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({ region: "us-east-1" });

export async function createUploadPresignedUrl(
  userId: string,
  fileName: string,
  contentType: string
): Promise<{ uploadUrl: string; key: string }> {
  const key = \`uploads/\${userId}/\${Date.now()}-\${fileName}\`;

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: key,
    ContentType: contentType,
  });

  // URL expires in 15 minutes (900 seconds)
  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 900 });

  return { uploadUrl, key };
}`,
          },
        },
        {
          id: "2",
          number: 2,
          title: "Serverless Computing & AWS Lambda",
          priority: "🔥",
          theory: {
            what: "AWS Lambda is an event-driven, ephemeral Function-as-a-Service (FaaS) platform that executes code in response to events (API Gateway, S3, SQS, DynamoDB Streams, EventBridge) with automatic horizontal scaling down to zero.",
            why: "Zero idle server cost, automated scaling from 0 to 10,000 concurrent executions, and reduced operational maintenance.",
            how: "Mitigate Cold Starts (container initialization latency) using: (1) Provisioned Concurrency for latency-critical APIs, (2) Keeping bundle sizes minimal (<10MB), (3) Initializing DB connection pools outside the handler function to reuse connections across warm invocations.",
            keyPoints: [
              "Execution Timeout: Hard 15-minute maximum runtime limit (not for long-running batch jobs)",
              "Stateless execution: Local /tmp disk is ephemeral (up to 10GB ephemeral storage available)",
              "Concurrency Limits: Default 1,000 concurrent executions per region (can throttle downstream relational databases)",
            ],
            interviewQuestions: [
              {
                question: "How do you manage database connection pooling when using AWS Lambda with PostgreSQL/MySQL?",
                answer: "Because thousands of ephemeral Lambda containers can spin up simultaneously, direct database connections quickly exceed max_connections. Use a database proxy like AWS RDS Proxy or PgBouncer to pool and share database connections across all serverless function instances.",
              },
            ],
          },
          codeExample: {
            title: "AWS Lambda Handler with Warm Connection Reuse",
            code: `import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Pool } from "pg";

// Declared OUTSIDE handler -> Persists across warm container invocations!
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 2, // Keep connection pool small per Lambda instance
});

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const { rows } = await pool.query("SELECT id, name FROM products LIMIT 10");

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ products: rows }),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};`,
          },
        },
        {
          id: "3",
          number: 3,
          title: "Cloud Networking (VPC) & IAM Security",
          priority: "🔥",
          theory: {
            what: "Amazon Virtual Private Cloud (VPC) creates an isolated private network. Public Subnets have routes to an Internet Gateway; Private Subnets communicate outward via a NAT Gateway (preventing inbound internet access). IAM (Identity & Access Management) enforces the Principle of Least Privilege via Users, Groups, Roles, and Policies.",
            why: "Databases, Redis caches, and internal microservices must NEVER be placed in public subnets with public IP addresses.",
            how: "Place databases in isolated Private Subnets with no internet access. Use Security Groups (stateful firewall at instance level) and Network ACLs (stateless firewall at subnet level). Assign IAM Roles to EC2/Lambda instances (Instance Profiles) rather than embedding long-lived AWS Access Keys.",
            keyPoints: [
              "Security Groups (Stateful): Return traffic is automatically allowed regardless of outbound rules",
              "NACLs (Stateless): Explicit inbound AND outbound allow/deny rules required",
              "IAM Roles vs Users: Applications must assume temporary IAM Roles; never hardcode AWS_SECRET_ACCESS_KEY",
            ],
            interviewQuestions: [
              {
                question: "What is the difference between Security Groups and Network ACLs (NACLs) in AWS?",
                answer: "Security Groups operate at the instance/ENI level, are stateful (inbound allows matching return outbound traffic automatically), and only support ALLOW rules. NACLs operate at the subnet boundary, are stateless (inbound and outbound rules evaluated separately), and support both ALLOW and DENY rules in numbered order.",
              },
            ],
          },
          codeExample: {
            title: "Least-Privilege IAM Policy for S3 Uploads (JSON)",
            code: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowSpecificS3UploadsOnly",
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject"
      ],
      "Resource": "arn:aws:s3:::my-production-bucket/uploads/*"
    }
  ]
}`,
          },
        },
      ],
    },
    {
      id: "iac-terraform",
      title: "Infrastructure as Code (IaC)",
      icon: "📜",
      heroTitle: "📜 Infrastructure as Code with Terraform",
      heroSubtitle: "HCL syntax, state management, S3 + DynamoDB locking, and modules",
      heroGradient: "from-purple-700 via-indigo-800 to-blue-900",
      concepts: [
        {
          id: "4",
          number: 4,
          title: "Terraform Fundamentals & State Management",
          priority: "🔥",
          theory: {
            what: "Terraform (by HashiCorp) is an open-source, declarative Infrastructure as Code (IaC) tool written in HCL (HashiCorp Configuration Language). It translates code into cloud API calls across AWS, GCP, Azure, and Cloudflare. The terraform.tfstate file maps declarative code to real-world provisioned cloud resource IDs.",
            why: "Manual clicking in AWS Console ('ClickOps') is unrepeatable, undocumented, and error-prone. IaC enables automated pull requests, reviewable peer approvals, and disaster recovery.",
            how: "Core CLI lifecycle: (1) terraform init (downloads provider plugins), (2) terraform plan (previews additions/modifications/destructions without applying), (3) terraform apply (provisions resources), (4) terraform destroy.",
            keyPoints: [
              "Remote Backend: Store terraform.tfstate in AWS S3 with encryption at rest",
              "State Locking with DynamoDB: Prevents two engineers or CI pipelines from running apply concurrently and corrupting state",
              "Drift Detection: terraform plan detects when someone manually altered AWS console settings",
            ],
            interviewQuestions: [
              {
                question: "Why is remote state locking with DynamoDB critical when using Terraform in a team?",
                answer: "If two team members or CI/CD pipelines run terraform apply simultaneously, they would execute conflicting modifications and race to write to the state file, resulting in corrupted state and orphaned cloud resources. DynamoDB provides atomic distributed state locks (LockID) during apply operations.",
              },
            ],
          },
          codeExample: {
            title: "Terraform AWS S3 Remote Backend with DynamoDB State Lock",
            code: `# versions.tf
terraform {
  required_version = ">= 1.6.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Remote State Storage + Distributed Lock
  backend "s3" {
    bucket         = "company-terraform-state-prod"
    key            = "services/api/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-state-locks" # Prevents concurrent applies
  }
}`,
          },
        },
        {
          id: "5",
          number: 5,
          title: "Terraform Modules & Declarative Resources",
          priority: "🔥",
          theory: {
            what: "Terraform Modules are self-contained packages of Terraform configurations that encapsulate infrastructure patterns (e.g., standard VPC module, RDS cluster module) to enable reuse and standardization across environments (Dev, Staging, Prod).",
            why: "Prevents copy-pasting hundreds of lines of identical HCL across repositories.",
            how: "Define input variables (variables.tf), resources (main.tf), and outputs (outputs.tf). Instantiate the module in root configuration passing environment-specific values.",
            keyPoints: [
              "DRY Infrastructure: Reusable modules parameterized by environment",
              "Resource Dependencies: Terraform automatically constructs a Directed Acyclic Graph (DAG) to determine optimal parallel creation order",
              "Sensitive variables: Mark sensitive = true to prevent secrets from appearing in plaintext console output",
            ],
            interviewQuestions: [
              {
                question: "How does Terraform determine the order in which resources are created?",
                answer: "Terraform analyzes references between resources (e.g. subnet_id = aws_subnet.main.id) and builds a Directed Acyclic Graph (DAG). Independent resources are provisioned in parallel, while dependent resources wait until their prerequisites complete.",
              },
            ],
          },
          codeExample: {
            title: "Declarative AWS S3 Bucket & CloudFront CDN Module (main.tf)",
            code: `# Provision S3 Bucket with Block Public Access
resource "aws_s3_bucket" "static_assets" {
  bucket = var.bucket_name
}

resource "aws_s3_bucket_public_access_block" "block_public" {
  bucket                  = aws_s3_bucket.static_assets.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# S3 Bucket Policy allowing CloudFront Origin Access Control (OAC)
data "aws_iam_policy_document" "s3_oac_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["\${aws_s3_bucket.static_assets.arn}/*"]
    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }
  }
}`,
          },
        },
      ],
    },
  ],
};
