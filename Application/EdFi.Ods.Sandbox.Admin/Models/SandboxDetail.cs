namespace EdFi.Ods.Sandbox.Admin.Models
{
    public class SandboxDetail
    {
        public string ApiKey { get; set; }
        public string DatabaseName { get; set; }
        public string Owner { get; set; }
        public bool IsOrphaned { get; set; }
        public string Name { get; set; }
        public string SandboxType { get; set; }
    }
}