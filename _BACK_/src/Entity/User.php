<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 */
class User implements UserInterface
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Groups("main")
     * @Assert\Email()
     */
    private $email;

    /**
     * @ORM\Column(type="json")
     */
    private $roles = [];

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("main")
     */
    private $firstName;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("main")
     */
    private $lastName;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $streetName;

    /**
     * @ORM\Column(type="string", length=45)
     */
    private $houseNumber;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $mailboxNumber;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $city;

    /**
     * @ORM\Column(type="string", length=45, nullable=true)
     */
    private $telephone;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $postalCode;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $password;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\HistoryArticle", mappedBy="user", cascade={"remove"}, fetch="EAGER")
     */
    private $historyArticles;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\ReadLaterArticle", mappedBy="user", cascade={"remove"}, fetch="EAGER")
     */
    private $readLaterArticles;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $theme;

    public function __construct()
    {
        $this->historyArticles = new ArrayCollection();
        $this->readLaterArticles = new ArrayCollection();
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed for apps that uses bcrypt or argon
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getStreetName(): ?string
    {
        return $this->streetName;
    }

    public function setStreetName(string $streetName): self
    {
        $this->streetName = $streetName;

        return $this;
    }

    public function getHouseNumber(): ?string
    {
        return $this->houseNumber;
    }

    public function setHouseNumber(string $houseNumber): self
    {
        $this->houseNumber = $houseNumber;

        return $this;
    }

    public function getMailboxNumber(): ?string
    {
        return $this->mailboxNumber;
    }

    public function setMailboxNumber(string $mailboxNumber): self
    {
        $this->mailboxNumber = $mailboxNumber;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getTelephone(): ?string
    {
        return $this->telephone;
    }

    public function setTelephone(?string $telephone): self
    {
        $this->telephone = $telephone;

        return $this;
    }

    public function getPostalCode(): ?string
    {
        return $this->postalCode;
    }

    public function setPostalCode(string $postalCode): self
    {
        $this->postalCode = $postalCode;

        return $this;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getAvatarUrl(string $size = null): string
    {
        $url = 'https://robohash.org/'.$this->getEmail();
        if ($size)
            $url .= sprintf('?size=%dx%d', $size, $size);
        return $url;
    }

    public function getAllInfo(): array
    {
        $user["email"] = $this->getEmail();
        $user["first_Name"] = $this->getFirstName();
        $user["last_Name"] = $this->getLastName();
        $user["street_Name"] = $this->getStreetName();
        $user["house_Number"] = $this->getHouseNumber();
        $user["mailbox_Number"] = $this->getMailboxNumber();
        $user["city"] = $this->getCity();
        $user["telephone"] = $this->getTelephone();
        $user["postal_Code"] = $this->getPostalCode();
        $user["avatar_Url"] = $this->getAvatarUrl();
        $user["theme"] = $this->getTheme();

        return $user;
    }

    /**
     * @return Collection|HistoryArticle[]
     */
    public function getHistoryArticles(): Collection
    {
        return $this->historyArticles;
    }

    public function addHistoryArticle(HistoryArticle $historyArticle): self
    {
        if (!$this->historyArticles->contains($historyArticle)) {
            $this->historyArticles[] = $historyArticle;
            $historyArticle->setUsers($this);
        }

        return $this;
    }

    public function removeHistoryArticle(HistoryArticle $historyArticle): self
    {
        if ($this->historyArticles->contains($historyArticle)) {
            $this->historyArticles->removeElement($historyArticle);
            // set the owning side to null (unless already changed)
            if ($historyArticle->getUsers() === $this) {
                $historyArticle->setUsers(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|ReadLaterArticle[]
     */
    public function getReadLaterArticles(): Collection
    {
        return $this->readLaterArticles;
    }

    public function addReadLaterArticle(ReadLaterArticle $readLaterArticle): self
    {
        if (!$this->readLaterArticles->contains($readLaterArticle)) {
            $this->readLaterArticles[] = $readLaterArticle;
            $readLaterArticle->setUser($this);
        }

        return $this;
    }

    public function removeReadLaterArticle(ReadLaterArticle $readLaterArticle): self
    {
        if ($this->readLaterArticles->contains($readLaterArticle)) {
            $this->readLaterArticles->removeElement($readLaterArticle);
            // set the owning side to null (unless already changed)
            if ($readLaterArticle->getUser() === $this) {
                $readLaterArticle->setUser(null);
            }
        }

        return $this;
    }

    public function getTheme(): ?string
    {
        return $this->theme;
    }

    public function setTheme(?string $theme): self
    {
        $this->theme = $theme;

        return $this;
    }
}
