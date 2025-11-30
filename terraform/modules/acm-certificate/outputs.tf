output "certificate_arn" {
  description = "ARN of the ACM certificate"
  value       = aws_acm_certificate.site.arn
}

output "certificate_status" {
  description = "Status of the ACM certificate"
  value       = aws_acm_certificate.site.status
}
