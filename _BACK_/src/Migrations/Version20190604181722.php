<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190604181722 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE read_later_article ADD user_id INT DEFAULT NULL, CHANGE title title VARCHAR(255) DEFAULT NULL, CHANGE description description LONGTEXT DEFAULT NULL, CHANGE url url LONGTEXT DEFAULT NULL, CHANGE published_at published_at VARCHAR(255) DEFAULT NULL, CHANGE content content LONGTEXT DEFAULT NULL');
        $this->addSql('ALTER TABLE read_later_article ADD CONSTRAINT FK_9196BE5FA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_9196BE5FA76ED395 ON read_later_article (user_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE read_later_article DROP FOREIGN KEY FK_9196BE5FA76ED395');
        $this->addSql('DROP INDEX IDX_9196BE5FA76ED395 ON read_later_article');
        $this->addSql('ALTER TABLE read_later_article DROP user_id, CHANGE title title VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, CHANGE description description LONGTEXT NOT NULL COLLATE utf8mb4_unicode_ci, CHANGE url url LONGTEXT NOT NULL COLLATE utf8mb4_unicode_ci, CHANGE published_at published_at VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, CHANGE content content LONGTEXT NOT NULL COLLATE utf8mb4_unicode_ci');
    }
}
