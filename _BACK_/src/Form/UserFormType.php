<?php


namespace App\Form;


use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Tests\Fixtures\ChoiceSubType;

class UserFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('email')
//            ->add('roles', CheckboxType::class, [
//                'required' => false
//            ])
            ->add('firstName')
            ->add('lastName')
            ->add(
                'roles', ChoiceType::class, [
                'choices' => ['Admin' => 'ROLE_ADMIN'],
                'expanded' => true,
                'multiple' => true,
                'label_attr' => ['class' => 'checkbox']
            ])
            ->add('streetName')
            ->add('houseNumber')
            ->add('mailboxNumber', null, [
                'required' => false
            ])
            ->add('city')
            ->add('telephone', null, [
                'required' => false
            ])
            ->add('postalCode')
            ->add('password', PasswordType::class, [

            ])
        ;
    }
}