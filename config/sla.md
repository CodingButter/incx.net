# Service Level Agreement (SLA)

**Effective Date:** {{build.date}}
**Company:** {{company.name}}

---

## Introduction

This Service Level Agreement ("SLA") defines the service commitments and guarantees provided by {{company.name}} for our hosting services. This SLA is part of our Terms of Service and represents our commitment to delivering reliable, high-performance services to our clients.

---

## 1. Network Uptime Guarantee

### 1.1 Uptime Commitment

{{company.name}} guarantees **99.9% network uptime** on a monthly basis for all services.

Network uptime is calculated as:

**Uptime % = ((Total Minutes in Month - Downtime Minutes) / Total Minutes in Month) × 100**

### 1.2 Uptime Calculation

The following table shows allowed downtime per month based on our guarantee:

| Uptime % | Allowed Downtime (30-day month) |
|----------|----------------------------------|
| 99.9%    | 43 minutes 49 seconds           |
| 99.5%    | 3 hours 36 minutes              |
| 99.0%    | 7 hours 18 minutes              |

Our commitment is to maintain **99.9% uptime**, ensuring maximum availability for your services.

---

## 2. Service Credits

### 2.1 Credit Eligibility

If we fail to meet the 99.9% uptime guarantee in any given month, you may be eligible for service credits according to the following schedule:

| Monthly Uptime % | Service Credit |
|------------------|----------------|
| 99.0% - 99.8%    | 10% of monthly service fee |
| 95.0% - 98.9%    | 25% of monthly service fee |
| Below 95.0%      | 50% of monthly service fee |

### 2.2 Requesting Credits

To request a service credit, you must:

- Submit a support ticket within **7 days** of the end of the affected month
- Provide details of the downtime experienced
- Include server/service identification information
- Have a current, paid account in good standing

**Credit Processing:**
- Credits will be applied to your account within 30 days of approval
- Credits can be used toward future services
- Credits are **not redeemable for cash**

---

## 3. SLA Exclusions

### 3.1 Excluded Events

The uptime guarantee does **not apply** to downtime caused by:

**Maintenance Events:**
- Scheduled maintenance (announced at least 48 hours in advance)
- Emergency maintenance required for security or stability

**Client-Related Issues:**
- Issues with your server configuration or software
- Client-initiated actions (reboots, OS reinstalls, etc.)
- Violations of our Terms of Service or Acceptable Use Policy

**External Factors:**
- DDoS attacks targeting your services
- Force majeure events (natural disasters, war, terrorism, etc.)
- Internet backbone provider failures beyond our control

**Account Issues:**
- Unpaid invoices or account suspensions
- Service termination due to policy violations

---

## 4. Hardware Replacement Guarantee

### 4.1 Dedicated Servers

For dedicated server services, we guarantee:

- **Failed hardware components** will be replaced within **4 hours** of detection
- **Proactive monitoring** of hardware health
- **Immediate notification** of hardware issues
- **Free hardware replacements** for manufacturing defects

### 4.2 VPS Services

VPS services run on **redundant infrastructure** with automatic failover:

- High-availability hypervisor configuration
- Automatic migration to healthy nodes during failures
- Minimal downtime during hardware issues
- Real-time monitoring and proactive management

---

## 5. Support Response Times

### 5.1 Guaranteed Response Times

We guarantee the following response times for support tickets:

| Priority Level | Definition | Response Time |
|----------------|------------|---------------|
| **Critical** | Service completely unavailable | Within 1 hour |
| **High** | Significant service degradation | Within 4 hours |
| **Medium** | Minor issues or questions | Within 12 hours |
| **Low** | General inquiries | Within 24 hours |

### 5.2 Response Time Definition

Response times are measured from ticket submission to **first substantive response** from our support team during business hours (**24/7/365**).

**What Constitutes a Response:**
- Acknowledgment with initial assessment
- Troubleshooting steps or resolution
- Status update and estimated resolution time
- Not automated acknowledgment emails

---

## 6. Power and Cooling Infrastructure

### 6.1 Infrastructure Guarantees

All our data centers feature enterprise-grade infrastructure:

**Power Systems:**
- **N+1 power redundancy** with UPS backup
- On-site diesel generators for extended outages
- Multiple utility grid connections
- Automatic failover systems

**Cooling Systems:**
- Redundant cooling systems with 24/7 monitoring
- Environmental monitoring and alerting
- Temperature and humidity control
- Automatic failover to backup systems

---

## 7. Security Commitments

### 7.1 Physical Security

We are committed to maintaining secure facilities:

**Access Control:**
- 24/7 on-site security personnel
- Biometric access controls
- Multi-factor authentication for facility access
- Video surveillance of all critical areas

**Certifications & Audits:**
- SOC 2 Type II certified facilities
- Regular security audits and penetration testing
- Compliance with industry standards
- Annual third-party assessments

### 7.2 Network Security

**DDoS Protection:**
- DDoS mitigation included with all services
- Up to **500Gbps** protection capacity
- Real-time attack detection and mitigation
- Automatic traffic filtering

---

## 8. Network Monitoring

### 8.1 Network Operations Center (NOC)

Our Network Operations Center provides comprehensive monitoring:

**Monitoring Services:**
- **24/7/365** network monitoring
- Automated alerting systems
- Proactive issue detection and resolution
- Real-time status updates

**Performance Management:**
- Performance metrics and reporting
- Capacity planning and optimization
- Network traffic analysis
- Latency and packet loss monitoring

### 8.2 Status Transparency

- **Public status page** available at {{company.shortName}}.net/network-status
- Real-time incident updates
- Historical uptime data
- Scheduled maintenance notifications

---

## 9. Data Center Locations

### 9.1 Our Facilities

{{company.name}} operates in **Tier 3** data centers located in:

**Primary Locations:**
- **Detroit, Michigan** - Primary data center
- **Kansas City, Missouri** - Redundant location
- **Cleveland, Ohio** - Additional capacity

### 9.2 Geographic Redundancy

- Multiple carrier-neutral facilities
- Geographic diversity for disaster recovery
- Low-latency connections between locations
- Automated failover capabilities

---

## 10. Service Level Reporting

### 10.1 Monthly Reports

Available upon request:

- Monthly uptime reports
- Performance metrics
- Incident summaries
- Network statistics

### 10.2 Real-Time Monitoring

Clients have access to:

- Server resource monitoring
- Network traffic graphs
- Bandwidth utilization
- Service health status

---

## 11. SLA Modifications

### 11.1 Changes to This SLA

We reserve the right to modify this SLA at any time to:

- Reflect changes in our service offerings
- Comply with legal requirements
- Improve clarity and transparency
- Update commitments and guarantees

### 11.2 Notification of Changes

When we make changes to this SLA:

- Changes will be communicated via email at least **30 days** before taking effect
- Material changes will be highlighted
- Continued use of our services after changes take effect constitutes acceptance of the modified SLA

---

## 12. Limitations and Disclaimers

### 12.1 Maximum Liability

Our maximum liability under this SLA is limited to:

- Service credits as outlined in Section 2
- No cash refunds or damages beyond service credits
- Credits limited to affected service fees only

### 12.2 Sole Remedy

Service credits represent your **sole and exclusive remedy** for any service level failures. We are not liable for:

- Indirect or consequential damages
- Loss of profits or revenue
- Business interruption
- Data loss (maintain your own backups)

---

## 13. Client Responsibilities

### 13.1 Your Obligations

To be eligible for SLA benefits, you must:

**Account Management:**
- Maintain current contact information
- Keep account in good standing
- Pay invoices on time
- Respond to support requests promptly

**Service Usage:**
- Follow our Terms of Service and Acceptable Use Policy
- Maintain secure server configurations
- Keep software and applications updated
- Monitor your services for issues

**Incident Reporting:**
- Report issues promptly via support ticket
- Provide necessary information for troubleshooting
- Cooperate with our technical staff
- Document downtime for credit requests

---

## 14. Contact Information

### 14.1 Support Channels

For questions about this SLA or to report service issues:

**{{company.name}}**
📧 **General Support:** {{contact.email}}
📧 **Network Operations:** noc@incx.net
📞 **24/7 Support:** {{contact.phoneDisplay}}
📍 **Address:** {{contact.address.street}}, {{contact.address.city}}, {{contact.address.stateCode}} {{contact.address.zip}}
🌐 **Status Page:** {{company.shortName}}.net/network-status
🕐 **Availability:** {{contact.hours.support}}

### 14.2 Emergency Contact

For critical, service-affecting issues:

- **Call:** {{contact.phoneDisplay}} (24/7 emergency line)
- **Email:** noc@incx.net (monitored 24/7)
- Mark tickets as **"Critical"** or **"Urgent"**

---

## 15. Agreement Acceptance

By using {{company.name}} services, you acknowledge that:

1. You have read and understood this Service Level Agreement
2. You agree to the terms, conditions, and limitations outlined herein
3. You understand the procedures for requesting service credits
4. You accept that service credits are your sole remedy for SLA breaches
5. You will comply with your responsibilities as outlined in Section 13

**Thank you for trusting {{company.name}} with your hosting needs. We are committed to providing reliable, high-performance services backed by this comprehensive SLA.**

---

*Last Updated: {{build.month}} {{build.year}}*
