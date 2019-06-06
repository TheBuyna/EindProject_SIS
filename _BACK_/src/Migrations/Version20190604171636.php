<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190604171636 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE history_article (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, source_id VARCHAR(255) DEFAULT NULL, source_name VARCHAR(255) DEFAULT NULL, author VARCHAR(255) DEFAULT NULL, title VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, url LONGTEXT NOT NULL, url_to_image LONGTEXT DEFAULT NULL, published_at VARCHAR(255) NOT NULL, content LONGTEXT NOT NULL, INDEX IDX_265D228CA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE read_later_article (id INT AUTO_INCREMENT NOT NULL, source_id VARCHAR(255) DEFAULT NULL, source_name VARCHAR(255) DEFAULT NULL, author VARCHAR(255) DEFAULT NULL, title VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, url LONGTEXT NOT NULL, url_to_image LONGTEXT DEFAULT NULL, published_at VARCHAR(255) NOT NULL, content LONGTEXT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE history_article ADD CONSTRAINT FK_265D228CA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('DROP TABLE article');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE article (id INT AUTO_INCREMENT NOT NULL, source_id VARCHAR(255) DEFAULT NULL COLLATE utf8mb4_unicode_ci, source_name VARCHAR(255) DEFAULT NULL COLLATE utf8mb4_unicode_ci, author VARCHAR(255) DEFAULT NULL COLLATE utf8mb4_unicode_ci, title VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, description LONGTEXT NOT NULL COLLATE utf8mb4_unicode_ci, url LONGTEXT NOT NULL COLLATE utf8mb4_unicode_ci, url_to_image LONGTEXT DEFAULT NULL COLLATE utf8mb4_unicode_ci, published_at VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, content LONGTEXT NOT NULL COLLATE utf8mb4_unicode_ci, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('DROP TABLE history_article');
        $this->addSql('DROP TABLE read_later_article');
    }
}
